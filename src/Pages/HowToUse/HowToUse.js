import React from 'react';
import { FaUpload, FaCommentDots, FaDownload, FaSlidersH, FaRegEdit, FaPlusCircle, FaArrowDown, FaFileAlt  } from 'react-icons/fa';
import { Accordion, Card } from 'react-bootstrap';
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
            <FaUpload className="me-2" /> Step 1: Upload Your EGG File
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Click the "Choose File" button</li>
              <li>Select your EGG file (.xlsx format)</li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>

        {/* Step 2 */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaSlidersH className="me-2" /> Step 2: Define Grade Range
          </Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Click "Add Grade Criteria"</li>
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
              <li>This step is optional — leaving it blank 
                will keep the original grades unchanged.</li>
            </ul>
            
            <div className="alert alert-warning mt-3">
              <strong>Note:</strong> The grade you select won't be influenced 
              by other criteria. For example, if you change grades from 0 – 64 to 55, 
              another criteria for 55 – 65 won't affect that student. 
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
              <li>Enter up to three comment codes. </li>
              <li>You can search for a comment by typing its code or text.</li>
            </ul>
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
              <li>Review all grade rules and comments. 
              To make changes, click the "Edit" button.</li>
              <li>If all details are correct, click "Upload and Process."</li>
              <li>The download link will appear once the file is ready, 
                which may take up to a minute.</li>
              <li>Once processing is complete, click "Download Processed File" to save it.</li>
            </ol>

            <div className="alert alert-info mt-3">
              <strong>Note:</strong> Always verify processed grades before uploading to STARS.
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
      <Accordion.Header>
            <FaFileAlt className="me-2" /> View Sample Grade Criteria & Egg File Changes
    </Accordion.Header>
    <Accordion.Body>
      {/* Visual Example Section */}
      <section className="mt-5">
        {/* <h4 className="mb-3">Grade Processing Example</h4> */}
        <div className="row">
          <div className="col-12">
            <Card className="mb-4">
              <Card.Body>
              <h5 className="mb-3">Sample Grade Criteria</h5>
              <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Grade Range</th>
                      <th>Adjusted Grade</th>
                      <th>Comment 1</th>
                      <th>Comment 2</th>
                      <th>Comment 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='bg-danger'>0 - 64</td>
                      <td className='bg-danger'>55</td>
                      <td className='bg-danger'>527</td>
                      <td className='bg-danger'>2060</td>
                      <td className='bg-danger'>502</td>
                    </tr>   
                    <tr>
                      <td className='bg-orange'>65 - 69</td>
                      <td className='bg-orange'></td>
                      <td className='bg-orange'>521</td>
                      <td className='bg-orange'>2060</td>
                      <td className='bg-orange'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-yellow'>70 - 79</td>
                      <td className='bg-yellow'></td>
                      <td className='bg-yellow'>513</td>
                      <td className='bg-yellow'>528</td>
                      <td className='bg-yellow'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-success'>80 - 89</td>
                      <td className='bg-success'></td>
                      <td className='bg-success'>518</td>
                      <td className='bg-success'>522</td>
                      <td className='bg-success'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-primary'>90 - 100</td>
                      <td className='bg-primary'></td>
                      <td className='bg-primary'>519</td>
                      <td className='bg-primary'>518</td>
                      <td className='bg-primary'>502</td>
                    </tr>
                  </tbody>
                </table>
                <h4 className='m-4'><FaArrowDown /></h4>
                <h5 className="mb-3">Sample EGG File Changes</h5>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Original Mark</th>
                      <th>Adjusted Grade</th>
                      <th>Comment 1</th>
                      <th>Comment 2</th>
                      <th>Comment 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='bg-danger'>22</td>
                      <td className='bg-danger'>55</td>
                      <td className='bg-danger'>527</td>
                      <td className='bg-danger'>2060</td>
                      <td className='bg-danger'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-danger'>63</td>
                      <td className='bg-danger'>55</td>
                      <td className='bg-danger'>527</td>
                      <td className='bg-danger'>2060</td>
                      <td className='bg-danger'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-orange'>69</td>
                      <td className='bg-orange'></td>
                      <td className='bg-orange'>521</td>
                      <td className='bg-orange'>2060</td>
                      <td className='bg-orange'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-yellow'>70</td>
                      <td className='bg-yellow'></td>
                      <td className='bg-yellow'>513</td>
                      <td className='bg-yellow'>528</td>
                      <td className='bg-yellow'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-yellow'>74</td>
                      <td className='bg-yellow'></td>
                      <td className='bg-yellow'>513</td>
                      <td className='bg-yellow'>528</td>
                      <td className='bg-yellow'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-success'>82</td>
                      <td className='bg-success'></td>
                      <td className='bg-success'>518</td>
                      <td className='bg-success'>522</td>
                      <td className='bg-success'>502</td>
                    </tr>
                    <tr>
                      <td className='bg-primary'>94</td>
                      <td className='bg-primary'></td>
                      <td className='bg-primary'>519</td>
                      <td className='bg-primary'>518</td>
                      <td className='bg-primary'>502</td>
                    </tr>
                  </tbody>
                </table>
                <div className="alert alert-warning mt-3">
                  <strong>Note:</strong> Empty cells indicate no grade change from original mark.
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>
      <div className="mt-4 p-3 bg-light rounded important-notes">
        <h5 className='mb-3'>Important Notes:</h5>
        <ul className="text-left"> {/* Add text-left class here */}
          <li>Grade ranges are inclusive, meaning a range of 55–65 will include grades 55 and 65. </li>
          <li>If a grade is not covered by any range or no grade change or comment is specified, the cell will remain unchanged and no comments will be added.</li>
        </ul>
      </div>
      </Accordion.Body>
      </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default HowToUse;