from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openpyxl import Workbook
from io import BytesIO
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://eggfileprocessor.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process/")
async def process_grades(grades: str = Form(...), rules: str = Form(...)):
    try:
        # ✅ Convert grades from string input to a list of floats
        grades_list = [float(grade) for grade in grades.split("\n") if grade.strip().isdigit()]
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid grades format. Ensure only numbers are provided.")

    try:
        # ✅ Parse JSON rules
        rules = json.loads(rules)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for rules.")

    # ✅ Create a new Excel workbook
    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Processed Grades"

    # ✅ Add headers
    sheet.append(["Original Grade", "Updated Grade", "Comment 1", "Comment 2", "Comment 3"])

    # ✅ Process grades & apply rules
    for grade in grades_list:
        updated_grade = grade
        comments = ["", "", ""]  # Default empty comments

        for rule in rules:
            if rule.get("specialGrade") is None and isinstance(grade, float):
                if float(rule["minGrade"]) <= grade <= float(rule["maxGrade"]):
                    if rule.get("changeTo") not in (None, "N/A"):
                        updated_grade = float(rule["changeTo"])
                    comments = rule["comments"]
                    break

        # ✅ Append processed grades & comments to the sheet
        sheet.append([grade, updated_grade] + comments)

    # ✅ Save to BytesIO buffer
    output = BytesIO()
    workbook.save(output)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"},
    )
