
# How to Use the EGG File Processor

This document explains how to use the **EGG File Processor**, a tool designed to process and modify `.xlsx` EGG files with specific grade criteria and report card comments. Follow the steps below for a seamless experience.

---

## Features
- Upload and process `.xlsx` EGG files.
- Define grade ranges and adjust grades within those ranges.
- Add report card comment codes for students based on grades.
- Download the processed file with applied changes.

---

## How to Use

### **Step 1: Upload Your EGG File**
1. Click the **"Choose File"** button.
2. Select the EGG file you want to process. Ensure the file is in `.xlsx` format.

---

### **Step 2: Define Grade Ranges**
1. Click **"Add Grade Criteria"** to create a new grade range.
2. Specify the **minimum** and **maximum** grades for the range.
3. Ensure grade ranges do not overlap with one another.

> **Note**: Overlapping grade ranges will result in errors. Define unique ranges.

---

### **Step 3: Adjust Grades (Optional)**
1. Enter the grade you'd like to assign to the selected range.
2. If you leave this field blank, grades within the range will remain unchanged.

> **Example**: Grades in the range `0 - 64` can be adjusted to `55`.

---

### **Step 4: Add Report Card Comments (Optional)**
1. Enter up to **three comment codes** for each grade range.
2. You can search for comment codes by typing their number or description.

---

### **Step 5: Add Additional Criteria**
Repeat **Steps 2–4** to define multiple grade ranges and comments if needed.

---

### **Step 6: Process & Download**
1. Review all defined grade rules and comments.
2. Make edits using the **Edit** button if needed.
3. Click **"Upload and Process"** to start processing your file.
4. Once processing is complete, a **Download Processed File** link will appear.
5. Click the link to download the modified file.

> **Note**: Processing may take up to one minute. Verify the downloaded file before uploading to STARS or other systems.

---

## Example

### **Sample Grade Criteria**
| Grade Range | Adjusted Grade | Comment 1 | Comment 2 | Comment 3 |
|-------------|----------------|-----------|-----------|-----------|
| 0 - 64      | 55             | 527       | 2060      | 502       |
| 65 - 69     |                | 521       | 2060      | 502       |
| 70 - 79     |                | 513       | 528       | 502       |
| 80 - 89     |                | 518       | 522       | 502       |
| 90 - 100    |                | 519       | 518       | 502       |

---

## Important Notes
- Grade ranges are **inclusive**, meaning `55–65` includes grades `55` and `65`.
- Empty fields in the processed file indicate no changes were made to the original data.
- Always verify the processed grades and comments before submission.

---

## FAQ
### **What happens if I don't specify adjusted grades?**
The grades within that range will remain unchanged.

### **Can I add overlapping grade ranges?**
No, overlapping ranges are not allowed. Ensure all ranges are unique.

### **How do I remove or edit existing criteria?**
Use the **Edit** or **Remove** buttons for each rule in the list.

---

For further assistance, contact the development team or refer to the in-app documentation.