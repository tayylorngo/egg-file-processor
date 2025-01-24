from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openpyxl import load_workbook
from io import BytesIO
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
        ],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/upload/")
async def process_file(file: UploadFile = File(...), rules: str = Form(...)):
    workbook = load_workbook(file.file)
    sheet = workbook["Student Marks"]

    # Parse and validate rules
    rules = json.loads(rules)  # Convert JSON string to Python list

    for rule in rules:
        min_grade = int(rule["minGrade"])
        max_grade = int(rule["maxGrade"])

        if not rule["changeTo"] == "N/A":
            change_to = (0 <= int(rule["changeTo"]) <= 100)
        else:
            change_to = True

        if not (0 <= min_grade <= 100 and 0 <= max_grade <= 100 and change_to):
            raise HTTPException(
                status_code=400,
                detail=f"Invalid grade range or adjustment: {rule}. Grades must be between 0 and 100."
            )

        if min_grade > max_grade:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid rule: Minimum grade ({min_grade}) cannot be greater than maximum grade ({max_grade})."
            )

    # Apply rules to grades
    for row in range(2, sheet.max_row + 1):
        grade_cell = sheet.cell(row=row, column=11)  # Column K
        if grade_cell.value is not None:
            grade = float(grade_cell.value)
            for rule in rules:
                if float(rule["minGrade"]) <= grade <= float(rule["maxGrade"]):
                    if rule["changeTo"] != "N/A":
                        grade_cell.value = float(rule["changeTo"])
                    comments = rule["comments"]
                    if comments[0] != "N/A":
                        sheet.cell(row=row, column=12).value = comments[0] # Column L
                    if comments[1] != "N/A":
                        sheet.cell(row=row, column=13).value = comments[1] # Column M
                    if comments[2] != "N/A":
                        sheet.cell(row=row, column=14).value = comments[2] # Column M
                    break

    # Save the workbook
    output = BytesIO()
    workbook.save(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"})
