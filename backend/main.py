from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openpyxl import load_workbook
from io import BytesIO
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://eggfileprocessor.netlify.app"],  # Allow only these
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def process_file(file: UploadFile = File(...), rules: str = Form(...)):
    # ✅ Load Workbook & Validate Sheet
    workbook = load_workbook(file.file)
    if "Student Marks" not in workbook.sheetnames:
        raise HTTPException(status_code=400, detail="Sheet 'Student Marks' not found in the uploaded file.")
    sheet = workbook["Student Marks"]

    # ✅ Parse JSON rules
    try:
        rules = json.loads(rules)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for rules.")

    # ✅ Validate rules
    for rule in rules:
        if rule.get("minGrade") is not None and rule.get("maxGrade") is not None:
            try:
                min_grade = float(rule["minGrade"])
                max_grade = float(rule["maxGrade"])
            except ValueError:
                raise HTTPException(status_code=400, detail=f"Invalid min/max grade: {rule}")

            # ✅ Fix changeTo Validation
            change_to_value = rule.get("changeTo")
            if change_to_value not in (None, "N/A"):
                try:
                    change_to_value = float(change_to_value)
                except ValueError:
                    raise HTTPException(status_code=400, detail=f"Invalid changeTo value: {change_to_value}")

            # ✅ Ensure valid range
            if not (0 <= min_grade <= 100 and 0 <= max_grade <= 100):
                raise HTTPException(status_code=400, detail=f"Invalid grade range: {rule}")

            if min_grade > max_grade:
                raise HTTPException(status_code=400, detail=f"Invalid rule: minGrade ({min_grade}) cannot be greater than maxGrade ({max_grade}).")

    # ✅ Process grades (Only One Loop)
    for row in range(2, sheet.max_row + 1):
        grade_cell = sheet.cell(row=row, column=11)  # Column K
        cell_value = grade_cell.value

        # ✅ Normalize grade
        if isinstance(cell_value, str) and cell_value.replace(".", "", 1).isdigit():
            grade = float(cell_value)  # Convert if numeric
        elif isinstance(cell_value, (int, float)):
            grade = float(cell_value)
        else:
            grade = cell_value  # Keep as is (special grade)

        for rule in rules:
            # ✅ Standard grade range check
            if rule.get("specialGrade") is None and isinstance(grade, float):
                if float(rule["minGrade"]) <= grade <= float(rule["maxGrade"]):
                    if rule.get("changeTo") not in (None, "N/A"):
                        grade_cell.value = float(rule["changeTo"])
                    for i, col in enumerate(range(12, 15)):  # Columns L, M, N
                        if rule["comments"][i] not in (None, "N/A"):
                            sheet.cell(row=row, column=col).value = rule["comments"][i]
                    break

            # ✅ Fix special grade handling
            elif rule.get("specialGrade") and rule["specialGrade"].get("value") == grade:
                for i, col in enumerate(range(12, 15)):  # Columns L, M, N
                    if rule["comments"][i] not in (None, "N/A"):
                        sheet.cell(row=row, column=col).value = rule["comments"][i]
                break

    # ✅ Save and return modified Excel file
    output = BytesIO()
    workbook.save(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                             headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"})
