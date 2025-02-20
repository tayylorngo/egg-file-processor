
# How to Use the EGG File Processor
Link: https://eggfileprocessor.netlify.app/

This document explains how to use the **EGG File Processor**, a tool designed to help fill out EGG files faster with specific grade criteria and report card comments. Follow the steps below for a seamless experience.

---

## Features
- Define grade ranges and adjust grades within those ranges.
- Add report card comment codes for students based on grades.
- Download the processed file with data containing the new grades and comments.

---

## How to Use

### **Step 1: Paste Grades from EGG File**
1. Copy the column containing all the grades in your EGG file on Microsoft Excel.
2. Paste it in the textbox.
> **Note**: Each one of your grades should be separated by a new line.
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
3. Click **"Process Grades"** to start processing your file.
4. Once processing is complete, a **Download Processed File** link will appear.
5. Click the link to download the file.
6. Open the file and paste the new grades and comments into your EGG file.
> **Tip**: To paste, use **CTRL + SHIFT + V (Windows)** or **CMD + SHIFT + V (Mac)**. This will keep the formatting of the original EGG file.
7. Upload your EGG file to STARS.
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
### **Does this violate the DOE Data Privacy and Security Policies?**
No, the EGG File Processor does not violate DOE student data policies.

The tool only processes numerical grade inputs and does not collect, store, or transmit any personally identifiable student information (PII) such as names, ID numbers, or other sensitive data. Users manually enter or paste only numerical grades, which are then modified based on predefined rules before being returned as an Excel file. Since the tool does not interact with student records, school databases, or external servers, it fully complies with data privacy regulations and DOE policies. 🚀

You may read more about the DOE Data Privacy and Security Policies here: https://www.schools.nyc.gov/about-us/policies/data-privacy-and-security-policies

### **What happens if I don't specify adjusted grades?**
The grades within that range will remain unchanged.

### **Can I add overlapping grade ranges?**
No, overlapping ranges are not allowed. Ensure all ranges are unique.

### **How do I remove or edit existing criteria?**
Use the **Edit** or **Remove** buttons for each rule in the list.

### **Does the EGG File Processor save my grade criteria?**
Yes, the EGG File Processor saves your grade criteria in your browser. Your grading criteria is stored locally using browser storage (localStorage), so they remain available even after you close or refresh the page. However, since the data is only saved in your browser, it won’t be accessible if you switch devices or clear your browser storage. 



---

For further assistance, contact the development team or refer to the in-app documentation.