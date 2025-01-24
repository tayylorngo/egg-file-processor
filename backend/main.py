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
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/upload/")
async def process_file(file: UploadFile = File(...), rules: str = Form(...)):
    workbook = load_workbook(file.file)
    sheet = workbook["Student Marks"]

    # Parse rules
    rules = json.loads(rules)  # Convert JSON string to a Python list

    # Apply rules to grades
    for row in range(2, sheet.max_row + 1):
        grade_cell = sheet.cell(row=row, column=11)  # Column K
        if grade_cell.value is not None and isinstance(grade_cell.value, (int, float)):
            grade = float(grade_cell.value)
            for rule in rules:
                if float(rule["min"]) <= grade <= float(rule["max"]):
                    grade_cell.value = float(rule["changeTo"])
                    break

    # Save the workbook
    output = BytesIO()
    workbook.save(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"})
