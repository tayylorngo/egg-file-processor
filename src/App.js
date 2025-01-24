import React, { useState } from "react";
import GradeRuleModal from "./components/GradeRuleModal/GradeRuleModal";
import GradeRuleList from "./components/GradeRuleList/GradeRuleList";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [rules, setRules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Open or close the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Add a new rule
  const handleAddRule = (newRule) => {
    setRules([...rules, newRule]);
  };

  // Remove a rule
  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    if (rules.length === 0) {
      setMessage("Please add at least one grade rule.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("rules", JSON.stringify(rules)); // Send rules as JSON

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setMessage("File processed successfully! Click the button below to download it.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Excel File Processor</h1>
      <p>Upload your Excel file and define grade rules.</p>

      <div className="form-group">
        <label htmlFor="formFile">Upload your Excel file:</label>
        <input type="file" id="formFile" onChange={handleFileChange} />
      </div>

      <button onClick={toggleModal} className="btn">Add Custom Grade Rule</button>

      <GradeRuleList
          rules={rules.map(rule => ({
            minGrade: rule.minGrade,
            maxGrade: rule.maxGrade,
            changeTo: rule.changeTo,
            comments: rule.comments,
          }))}
          onRemoveRule={handleRemoveRule}
/>

      <button onClick={handleFileUpload} className="btn">Upload and Process</button>

      <p className="message">{message}</p>

      {downloadUrl && (
        <a href={downloadUrl} download="processed_grades.xlsx" className="download-link">
          Download Processed File
        </a>
      )}

      <GradeRuleModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onAddRule={handleAddRule}
        rules={rules} 
      />
    </div>
  );
}

export default App;