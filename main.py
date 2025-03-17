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
        grades_list = [grade.strip() for grade in grades.split("\n") if grade.strip()]
    except Exception:
        raise HTTPException(status_code=400, detail="Error reading grades.")

    try:
        rules = json.loads(rules)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for rules.")

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Processed Grades"
    sheet.append(["Original Grade", "Updated Grade", "Comment 1", "Comment 2", "Comment 3"])

    for grade in grades_list:
        updated_grade = grade
        comments = ["", "", ""]

        for rule in rules:
            rule_comments = rule.get("comments", ["", "", ""])
            special = rule.get("specialGrade")

            # ✅ Handle special grades
            if isinstance(special, dict) and special.get("value"):
                special_value = special["value"].strip().upper()
                if grade.strip().upper() == special_value:
                    change_to = rule.get("changeTo")
                    if change_to not in (None, "N/A"):
                        updated_grade = change_to
                    comments = ["" if c == "N/A" else c for c in rule_comments]
                    break

            # ✅ Handle numeric grades
            elif special in (None, {}, "", "N/A"):
                try:
                    grade_num = float(grade)
                    min_grade = float(rule.get("minGrade", 0))
                    max_grade = float(rule.get("maxGrade", 100))
                    if min_grade <= grade_num <= max_grade:
                        change_to = rule.get("changeTo")
                        if change_to not in (None, "N/A"):
                            updated_grade = float(change_to)
                        comments = ["" if c == "N/A" else c for c in rule_comments]
                        break
                except ValueError:
                    # Not a numeric grade → skip this rule
                    continue

        sheet.append([grade, updated_grade] + comments)

    output = BytesIO()
    workbook.save(output)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"},
    )

#changes