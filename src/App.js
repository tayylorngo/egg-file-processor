import React, { useState } from "react";
import GradeRuleModal from "./components/GradeRuleModal/GradeRuleModal";
import GradeRuleList from "./components/GradeRuleList/GradeRuleList";
import GradeRuleEditModal from "./components/GradeRuleEditModal/GradeRuleEditModal";
import Spinner from './components/Spinner/Spinner';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css"

function App() {
  const [file, setFile] = useState(null);
  const [rules, setRules] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(-1);

  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Open or close the modal
  const toggleCreateRuleModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const toggleEditRuleModal = (index) => {
    setEditingRule(index);
    setIsEditModalOpen(!isEditModalOpen);
  };

// Add a new rule
const handleAddRule = (newRule) => {
  setRules((prevRules) => {
    // Add the new rule and sort by mingrade
    const updatedRules = [...prevRules, newRule].sort((a, b) => a.minGrade - b.minGrade);
    return updatedRules;
  });
};

  // Remove a rule
  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  // Edit a rule
  const handleEditRule = (editedRule) => {
    setRules((rules) => {
      // Create a new array (immutable update)
      const newRules = [...rules];
      // Update the specific rule
      newRules[editingRule] = editedRule;

      // Sort the updated array by `minGrade`
      newRules.sort((a, b) => a.minGrade - b.minGrade);

      // Return the new array
      return newRules;
    });
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

    setMessage("");
    setLoading(true); // Show spinner

    try {
      const BASE_URL = "https://swift-grades.onrender.com";
      const endpoint = "/upload/";
      const uploadUrl = `${BASE_URL}${endpoint}`;
  
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData, // Ensure `formData` is properly constructed
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
    finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="container pb-1">
      <h1 className="fs-1">EGG File Processor</h1>
      <p className="mb-1 fs-5">Upload your EGG file (.xlsx) and define your grade criteria.</p>

      <div className="form-group">
        <input type="file" id="formFile" onChange={handleFileChange} />
      </div>


      <div className="mt-1 border border-1 mb-2 p-3 text-center">
      <GradeRuleList
          rules={rules.map(rule => ({
            minGrade: rule.minGrade,
            maxGrade: rule.maxGrade,
            changeTo: rule.changeTo,
            comments: rule.comments,
          }))}
          onRemoveRule={handleRemoveRule}
          openEditRuleModal={toggleEditRuleModal}
      />
      <button onClick={toggleCreateRuleModal} className="btn btn-primary w-50">Add Grade Criteria</button>
      </div>

      <div className="row">
        <button onClick={handleFileUpload} className="btn btn-success mt-3">Upload and Process</button>
      </div>

      <p className="message mt-3">{message}</p>

      {loading && <Spinner />} {/* Show Spinner when loading is true */}

      {downloadUrl && (
        <a href={downloadUrl} download="processed_grades.xlsx" className="download-link">
          Download Processed File
        </a>
      )}

      <GradeRuleModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateRuleModal}
        onAddRule={handleAddRule}
        rules={rules} 
      />

      <GradeRuleEditModal
        isOpen={isEditModalOpen}
        onClose={toggleEditRuleModal}
        onEditRule={handleEditRule}
        rules={rules}
        editedRuleIndex={editingRule}
      />
    </div>
  );
}

export default App;