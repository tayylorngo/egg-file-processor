import React from 'react';
import { FaUpload, FaCommentDots, FaDownload, FaSlidersH, FaRegEdit, FaPlusCircle, FaQuestionCircle } from 'react-icons/fa';
import { Accordion } from 'react-bootstrap';
import "./HowToUse.css";
import "bootstrap/dist/css/bootstrap.css";

const HowToUse = () => {
  return (
    <div className="container mt-7 mb-5">
      <h2 className="mb-4 text-center">EGG File Processor: How To Use</h2>
      
      <Accordion defaultActiveKey="0" flush>
        {/* Step 1 */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaUpload className="me-2" /> Step 1: Copy & paste grades from EGG file
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Copy the column containing all the grades in your EGG file on Microsoft Excel.</li>
              <li>Paste it in the textbox.</li>
            </ol>
            <div className="alert alert-warning mt-3">
              <strong>Note:</strong> Each grade should be separated by a new line.
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 2 */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaSlidersH className="me-2" /> Step 2: Define Grade Range
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Click "Add Grade Criteria".</li>
              <li>Enter the minimum and maximum grade values or choose a special grade.</li>
            </ol>
            <div className="alert alert-warning mt-3">
              <strong>Note:</strong> Grade ranges cannot overlap, and special grades must be unique.
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 3 */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaRegEdit className="me-2" /> Step 3: Change Grades (Optional)
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>Enter the grade you'd like to assign to the selected range.</li>
              <li>This step is optional — leaving it blank keeps the original grades unchanged.</li>
            </ul>
            <div className="alert alert-warning mt-3">
              <strong>Note:</strong> The grade you select won't be influenced by other criteria.
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 4 */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FaCommentDots className="me-2" /> Step 4: Add Report Card Comments (Optional)
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>Enter up to three comment codes.</li>
              <li>You can search for a comment by typing its code or text.</li>
            </ul>
            <div className="alert alert-warning mt-3">
              <strong>Note:</strong> This step is optional — leaving it blank will add no comments.
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 5 */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <FaPlusCircle className="me-2"/> Step 5: Add Additional Grade Criteria (Optional)
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>Repeat steps 2 - 4 to define more grade criteria if needed.</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 6 */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <FaDownload className="me-2" /> Step 6: Process & Download
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Review all grade rules and comments.</li>
              <li>If everything is correct, click "Process Grades".</li>
              <li>Once processing is complete, click "Download Processed File" to save it.</li>
              <li>Paste the new grades and comments into your EGG file and upload it to STARS.</li>
            </ol>
            <div className="alert alert-danger mt-3">
              <strong>Note:</strong> Always verify processed grades before uploading to STARS.
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* 📌 FAQ Section */}
      <h3 className="mb-3 mt-5 text-center"><FaQuestionCircle className="me-2" /> Frequently Asked Questions</h3>

      <Accordion flush>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Does the EGG File Processor save my grade criteria?</Accordion.Header>
          <Accordion.Body>
            Yes, your grading criteria is saved locally in your browser using <strong>localStorage</strong>. 
            This means your settings remain available even after you close or refresh the page.
            However, if you switch devices or clear your browser storage, your criteria will not be saved.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>What happens if I don’t specify adjusted grades?</Accordion.Header>
          <Accordion.Body>
            If you leave the "change to" field blank, the original grades will remain unchanged.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Can I add overlapping grade ranges?</Accordion.Header>
          <Accordion.Body>
            No, overlapping grade ranges are not allowed. Each range must be unique to avoid conflicts when processing grades. For special grades, no two criteria should have the same special grade.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>How do I remove or edit existing grade criteria?</Accordion.Header>
          <Accordion.Body>
            You can edit or remove grade criteria by using the <strong>Edit</strong> and <strong>Remove</strong> buttons within the rule list.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default HowToUse;
