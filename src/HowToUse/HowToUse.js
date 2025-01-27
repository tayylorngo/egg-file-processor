import React from 'react';
import { FaUpload, FaCommentDots, FaDownload, FaTable, FaSlidersH, FaRegEdit} from 'react-icons/fa';
import { Accordion, Card } from 'react-bootstrap';
import "./HowToUse.css"

const HowToUse = () => {
  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 text-center">EGG File Processor: How To Use</h2>
      
      <Accordion defaultActiveKey="0" flush>
        {/* Step 1 */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaUpload className="me-2" /> Step 1: Upload Your EGG File
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Click the "Choose File" button</li>
              <li>Select your EGG file (XLSX format)</li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 2 */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaSlidersH className="me-2" /> Step 2: Set Grade Criteria
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Click "Add Grade Criteria"</li>
              <li>Set minimum and maximum grade values.</li>
            </ol>
            
            <div className="alert alert-warning mt-3">
              <strong>Note:</strong> Ranges cannot overlap.
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 3 */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaRegEdit className="me-2" /> Step 3: Change Grades (Optional)
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Enter the grade you would like to change to for your selected range.</li>
            </ol>
            
            <div className="alert alert-warning mt-3">
              <strong>Note:</strong> The grade you select will not be affected by other grading criteria.
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
              <li>Choose from preset comments in dropdown menus</li>
              <li>Comments will appear in this order:
                <ol>
                  <li>Strengths</li>
                  <li>Areas for Improvement</li>
                  <li>General Comments</li>
                </ol>
              </li>
              <li>Use the "+" button to add more comment slots</li>
              <li>Use the "×" button to remove comments</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 5 */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <FaDownload className="me-2" /> Step 5: Process & Download
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Review all grade rules and comments</li>
              <li>Click "Upload and Process"</li>
              <li>Download link will appear when ready</li>
              <li>Click "Download Processed File" to save</li>
            </ol>

            <div className="alert alert-info mt-3">
              <strong>Note:</strong> Always verified processed grades before uploading to STARS.
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Visual Example Section */}
      <section className="mt-5">
        <h4 className="mb-3">Example Workflow</h4>
        <div className="row">
          <div className="col-md-6">
            <Card className="h-100">
              <Card.Header>Original Grades</Card.Header>
              <Card.Body>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Student A</td><td>58</td></tr>
                    <tr><td>Student B</td><td>72</td></tr>
                    <tr><td>Student C</td><td>63</td></tr>
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card className="h-100">
              <Card.Header>After Processing (0-64 → 55)</Card.Header>
              <Card.Body>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Student A</td><td>55</td></tr>
                    <tr><td>Student B</td><td>72</td></tr>
                    <tr><td>Student C</td><td>55</td></tr>
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <div className="mt-4 p-3 bg-light rounded">
        <h5>Important Notes:</h5>
        <ul>
          <li>Always verify processed files before distribution</li>
          <li>Comments are saved in a new "Report Comments" column</li>
          <li>Original grades are preserved in a "Original Grade" column</li>
          <li>System automatically skips invalid rows</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToUse;