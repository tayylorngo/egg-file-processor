from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from openpyxl import load_workbook
from io import BytesIO
import json

app = FastAPI()

@app.post("/upload/")
async def process_file(file: UploadFile = File(...), rules: str = Form(...)):
    workbook = load_workbook(file.file)
    sheet = workbook.active

    # Parse and validate rules
    try:
        rules = json.loads(rules)  # Convert JSON string to Python list
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid rules format.")

    for rule in rules:
        min_grade = int(rule["min"])
        max_grade = int(rule["max"])
        change_to = int(rule["changeTo"])

        # Validate that min, max, and change_to are within 0–100
        if not (0 <= min_grade <= 100 and 0 <= max_grade <= 100 and 0 <= change_to <= 100):
            raise HTTPException(
                status_code=400,
                detail=f"Invalid grade range or adjustment: {rule}. Grades must be between 0 and 100."
            )

        # Ensure min <= max
        if min_grade > max_grade:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid rule: Minimum grade ({min_grade}) cannot be greater than maximum grade ({max_grade})."
            )

    # Process the Excel file based on rules
    for row in range(2, sheet.max_row + 1):
        grade_cell = sheet.cell(row=row, column=11)  # Column K
        if grade_cell.value is not None and isinstance(grade_cell.value, (int, float)):
            grade = float(grade_cell.value)
            for rule in rules:
                if rule["min"] <= grade <= rule["max"]:
                    grade_cell.value = rule["changeTo"]
                    break

    # Save the workbook
    output = BytesIO()
    workbook.save(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"})
