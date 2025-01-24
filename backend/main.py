from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openpyxl import load_workbook
from io import BytesIO

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
async def process_file(file: UploadFile = File(...), threshold: int = Form(...)):
    workbook = load_workbook(file.file)
    sheet = workbook.active

    # Process grades in Column K (11th column)
    for row in range(2, sheet.max_row + 1):  # Skip header row
        grade_cell = sheet.cell(row=row, column=11)  # Column K is the 11th column
        grade_value = grade_cell.value
        try:
        # Attempt to convert the grade to an integer
            if grade_value is not None:
                grade = int(float(grade_value))  # Handles floats and converts them to int
                if grade < threshold:  # Compare the grade with the threshold
                    grade_cell.value = 55  # Adjust the grade to 55
            else:
                grade_cell.value = "NS"
        except (ValueError, TypeError):
            # Skip invalid or non-numeric values
            print(f"Skipping invalid grade value at row {row}: {grade_value}")

    # Save the workbook to a BytesIO object
    output = BytesIO()
    workbook.save(output)
    output.seek(0)

    # Return the file as a downloadable response
    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=processed_grades.xlsx"},
    )
