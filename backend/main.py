from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openpyxl import load_workbook
from io import BytesIO
import json

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://eggfileprocessor.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def process_file(file: UploadFile = File(...), rules: str = Form(...)):
    workbook = load_workbook(file.file)
    sheet = workbook["Student Marks"]

    # Parse JSON rules
    try:
        rules = json.loads(rules)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for rules.")

    # Validate rules
    for rule in rules:
        if rule.get("minGrade") is not None and rule.get("maxGrade") is not None:
            try:
                min_grade = float(rule["minGrade"])
                max_grade = float(rule["maxGrade"])
            except ValueError:
                raise HTTPException(status_code=400, detail=f"Invalid min/max grade: {rule}")

            # Validate "changeTo"
            change_to = True  # Default if "N/A"
            if rule.get("changeTo") not in (None, "N/A"):
                try:
                    change_to_value = float(rule["changeTo"])
                    change_to = (0 <= change_to_value <= 100)
                except ValueError:
                    raise HTTPException(status_code=400, detail=f"Invalid changeTo value: {rule['changeTo']}")

            # Ensure valid range
            if not (0 <= min_grade <= 100 and 0 <= max_grade <= 100 and change_to):
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid grade range or adjustment: {rule}"
                )

            if min_grade > max_grade:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid rule: Minimum grade ({min_grade}) cannot be greater than maximum grade ({max_grade})."
                )

    # Process grades
    for row in range(2, sheet.max_row + 1):
        grade_cell = sheet.cell(row=row, column=11)  # Column K
        cell_value = grade_cell.value

        # Normalize grade
        if isinstance(cell_value, str) and cell_value.isnumeric():
            grade = float(cell_value)
        elif isinstance(cell_value, (int, float)):
            grade = float(cell_value)
        else:
            grade = cell_value  # Keep as is if it's a special grade

    for row in range(2, sheet.max_row + 1):
        grade_cell = sheet.cell(row=row, column=11)  # Column K
        cell_value = grade_cell.value

        # Normalize grade: Convert to float if numeric, keep as string if special grade
        if isinstance(cell_value, str) and cell_value.replace(".", "", 1).isdigit():
            grade = float(cell_value)  # Convert to float if it's a number (including decimals)
        elif isinstance(cell_value, (int, float)):
            grade = float(cell_value)
        else:
            grade = cell_value  # Keep as-is (likely a special grade string)

        for rule in rules:
            # Standard grade range check (Only if grade is numeric)
            if rule.get("specialGrade") is None and isinstance(grade, float):
                if float(rule["minGrade"]) <= grade <= float(rule["maxGrade"]):
                    if rule.get("changeTo") not in (None, "N/A"):
                        grade_cell.value = float(rule["changeTo"])
                    for i, col in enumerate(range(12, 15)):  # Columns L, M, N
                        if rule["comments"][i] not in (None, "N/A"):
                            sheet.cell(row=row, column=col).value = rule["comments"][i]
                    break

            # Special grade match (Only if grade is a string)
            elif rule.get("specialGrade") and isinstance(grade, str):
                if rule["specialGrade"].get("value") == grade:
                    for i, col in enumerate(range(12, 15)):  # Columns L, M, N
                        if rule["comments"][i] not in (None, "N/A"):
                            sheet.cell(row=row, column=col).value = rule["comments"][i]
                    break


    # Save and return modified Excel file
    output = BytesIO()
    workbook.save(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"})
