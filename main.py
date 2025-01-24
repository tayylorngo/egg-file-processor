@app.post("/upload/")
async def process_file(file: UploadFile = File(...), rules: str = Form(...)):
    workbook = load_workbook(file.file)
    sheet = workbook.active

    # Parse and validate rules
    rules = json.loads(rules)  # Convert JSON string to Python list

    for rule in rules:
        if rule["changeTo"] == "N/A":
            continue  # Skip rules with no change

        min_grade = int(rule["min"])
        max_grade = int(rule["max"])
        change_to = int(rule["changeTo"])

        if not (0 <= min_grade <= 100 and 0 <= max_grade <= 100 and 0 <= change_to <= 100):
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
        if grade_cell.value is not None and isinstance(grade_cell.value, (int, float)):
            grade = float(grade_cell.value)
            for rule in rules:
                if rule["changeTo"] == "N/A":
                    continue
                if float(rule["min"]) <= grade <= float(rule["max"]):
                    grade_cell.value = float(rule["changeTo"])
                    break

    # Save the workbook
    output = BytesIO()
    workbook.save(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"})
