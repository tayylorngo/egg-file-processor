import React from 'react';
import { Card } from 'react-bootstrap';
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaFileContract } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.css";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="container mt-7 mb-5">
      <h2 className="mb-4 text-center"><FaFileContract className="me-2" /> Privacy Policy</h2>
          <p>
          The <strong>EGG File Processor</strong> prioritizes user privacy and complies with <strong>DOE Data Privacy Policies</strong>. 
          It helps educators process grades efficiently while ensuring no personally identifiable information (PII) is collected, stored, or transmitted.
          </p>

      <Card className="mb-4">
        <Card.Body>
          <h3><FaDatabase className="me-2" /> What Information We Process</h3>
          <p>The EGG File Processor only processes the following:</p>
          <ul>
            <li><strong>✅ Numerical Grades</strong> – Users manually input or paste grades into the tool for processing.</li>
            <li><strong>✅ Grade Adjustment Rules</strong> – Users define grading criteria, which are stored locally in their browser.</li>
            <li><strong>✅ Generated Excel Files</strong> – The processed file includes updated grades and optional report card comments.</li>
          </ul>

          <p>🚫 <strong>What We Do NOT Process:</strong></p>
          <ul>
            <li><FaLock className="me-2" /> <strong>❌ Student Names or Identifiers</strong> – No personal student data (e.g., names, IDs, emails) is collected.</li>
            <li><FaUserShield className="me-2" /> <strong>❌ School Database Integration</strong> – The tool does not connect to STARS or any external school systems.</li>
            <li><FaDatabase className="me-2" /> <strong>❌ User Tracking or Analytics</strong> – No usage data is tracked or stored on external servers.</li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h3><FaLock className="me-2" /> How Your Data Is Stored and Protected</h3>
          <ul>
            <li>🔒 <strong>Local Storage Only</strong> – Your grade criteria (rules) are stored **in your browser’s local storage**, allowing you to retrieve them later.</li>
            <li>🚫 <strong>No Cloud Storage</strong> – The tool does not save any data on external servers.</li>
            <li>🗑️ <strong>Temporary Processing</strong> – Once the Excel file is downloaded, all entered data is lost when the page is refreshed or closed.</li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h3><FaShieldAlt className="me-2" /> Compliance with DOE Policies</h3>
          <p>The EGG File Processor fully complies with the <strong>NYC DOE Data Privacy and Security Policies</strong>:</p>
          <ul>
            <li>✅ No personally identifiable information (PII) is collected, stored, or transmitted.</li>
            <li>✅ All processing occurs **on the user's device** without communication to external servers.</li>
            <li>✅ The tool operates in **strict accordance with DOE guidelines** for safeguarding student data.</li>
          </ul>
          <p>
            📖 For more details, visit the official  
            <a href="https://www.schools.nyc.gov/about-us/policies/data-privacy-and-security-policies" 
              target="_blank" rel="noopener noreferrer"> DOE Data Privacy and Security Policies</a>.
          </p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h3><FaUserShield className="me-2" /> User Responsibilities</h3>
          <p>While the EGG File Processor ensures **data privacy and security**, users are responsible for:</p>
          <ul>
            <li>✔️ <strong>Verifying processed grades before submission.</strong></li>
            <li>✔️ <strong>Ensuring compliance with DOE policies when using processed files.</strong></li>
            <li>✔️ <strong>Not entering student names, IDs, or other sensitive data into the tool.</strong></li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h3><FaFileContract className="me-2" /> Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy periodically to reflect improvements in security and compliance.
            Users will be notified of major changes via the website.
          </p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h3><FaDatabase className="me-2" /> Contact Information</h3>
          <p>If you have any questions regarding data privacy or security, please reach out to:</p>
          <p>📧 <strong>cs.taylorngo@gmail.com</strong></p>
          {/* <p>🌐 <strong>[Website Link]</strong></p> */}
        </Card.Body>
      </Card>

      {/* <Card className="mb-4 bg-light p-3">
        <h4 className="mb-2"><FaShieldAlt className="me-2" /> Final Notes</h4>
        <ul>
          <li>✅ <strong>100% DOE Compliant</strong> – No student PII is processed.</li>
          <li>✅ <strong>Fully Local Processing</strong> – No external data storage.</li>
          <li>✅ <strong>Designed for Teachers</strong> – Simplifies grading without security risks.</li>
        </ul>
      </Card> */}
    </div>
  );
};

export default PrivacyPolicy;
