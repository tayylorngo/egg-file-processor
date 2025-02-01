import React, { useState, useEffect } from "react";
import GradeRuleModal from "../../components/GradeRuleModal/GradeRuleModal";
import GradeRuleList from "../../components/GradeRuleList/GradeRuleList";
import GradeRuleEditModal from "../../components/GradeRuleEditModal/GradeRuleEditModal";
import GradeRuleDeleteModal from "../../components/GradeRuleDeleteModal/GradeRuleDeleteModal";
import Spinner from '../../components/Spinner/Spinner';
import "../../App.css";
import "bootstrap/dist/css/bootstrap.css"

function Home() {
  
  const [file, setFile] = useState(null);
  const [rules, setRules] = useState(() => {
    try {
      const savedRules = localStorage.getItem('gradeRules');
      return savedRules ? JSON.parse(savedRules) : [];
    } catch (error) {
      console.error('Error loading saved rules:', error);
      return [];
    }
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [editingRule, setEditingRule] = useState(-1);
  const [deletingRule, setDeletingRule] = useState(-1);

  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('gradeRules', JSON.stringify(rules));
    } catch (error) {
      console.error('Error saving rules:', error);
    }
  }, [rules]);

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

  const toggleDeleteRuleModal = (index, isDeleteAll) => {
    setDeletingRule(index);
    setIsDeleteAll(isDeleteAll);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  // Add a new rule
  const handleAddRule = (newRule) => {
    setRules((prevRules) => {
      // Append new rule
      const updatedRules = [...prevRules, newRule];
  
      // Sort Rules with a custom function
      return updatedRules.sort((a, b) => {
        const aHasNullGrade = a.minGrade === null || a.maxGrade === null;
        const bHasNullGrade = b.minGrade === null || b.maxGrade === null;
  
        // Case 1: Both have valid min/max grades → Sort numerically
        if (!aHasNullGrade && !bHasNullGrade) {
          return a.minGrade - b.minGrade || a.maxGrade - b.maxGrade;
        }
  
        // Case 2: Only one has null min/max → Move the one with null to the end
        if (aHasNullGrade && !bHasNullGrade) return 1;
        if (!aHasNullGrade && bHasNullGrade) return -1;
  
        // Case 3: Both have null min/max → Sort by specialGrade alphabetically
        const specialA = String(a.specialGrade || ""); // Ensure it's a string
        const specialB = String(b.specialGrade || "");
  
        return specialA.localeCompare(specialB);
      });
    });
  };

  // Remove a rule
  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  // Remove all rule
  const handleRemoveAllRules = () => {
    setIsDeleteAll(false);
    setRules([]);
  };

  // Edit a rule
  const handleEditRule = (editedRule) => {
    setRules((rules) => {
      // Create a new array (immutable update)
      const newRules = [...rules];
      // Update the specific rule
      newRules[editingRule] = editedRule;
  
      // Sort Rules with a custom function
      newRules.sort((a, b) => {
        const aHasNullGrade = a.minGrade === null || a.maxGrade === null;
        const bHasNullGrade = b.minGrade === null || b.maxGrade === null;
  
        // Case 1: Both have valid min/max grades → Sort numerically
        if (!aHasNullGrade && !bHasNullGrade) {
          return a.minGrade - b.minGrade || a.maxGrade - b.maxGrade;
        }
  
        // Case 2: Only one has null min/max → Move the one with null to the end
        if (aHasNullGrade && !bHasNullGrade) return 1;
        if (!aHasNullGrade && bHasNullGrade) return -1;
  
        // Case 3: Both have null min/max → Sort by specialGrade alphabetically
        const specialA = String(a.specialGrade || ""); // Ensure it's a string
        const specialB = String(b.specialGrade || "");
  
        return specialA.localeCompare(specialB);
      });
  
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
      // const BASE_URL = "http://127.0.0.1:8000";
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
    <>
    <div className="container pb-1 mt-10 mb-5">
      <h1 className="fs-1">EGG File Processor</h1>
      <p className="mb-1 fs-5">Upload your EGG file (.xlsx) and define your grade criteria.</p>

      <div className="form-group">
        <input 
          type="file" 
          id="formFile" 
          onChange={handleFileChange} 
          className="form-control" 
        />
      </div>


      <div className="mt-1 border border-1 mb-2 p-3 text-center">
      <GradeRuleList
          rules={rules.map(rule => ({
            minGrade: rule.minGrade,
            maxGrade: rule.maxGrade,
            changeTo: rule.changeTo,
            specialGrade: rule.specialGrade,
            comments: rule.comments,
          }))}
          openDeleteRuleModal={toggleDeleteRuleModal}
          openEditRuleModal={toggleEditRuleModal}
      />
      
      <div className="d-flex justify-content-center align-items-center gap-3" style={{ width: "60%", margin: "0 auto" }}>
        <button onClick={toggleCreateRuleModal} className="btn btn-primary" style={{ flex: "7" }}>
          Add Grade Criteria
        </button>
        {
        rules.length > 0  ? (<button onClick={() => toggleDeleteRuleModal(-1, true)} className="btn btn-danger" style={{ flex: "3" }}>
          Clear All
        </button>
        ) 
        : null
        }
      </div>
    </div>

      <button 
        onClick={handleFileUpload} 
        className="btn btn-success mt-3 w-100"
      >
        Upload and Process
      </button>

      <p className="message mt-3">{message}</p>

      {loading && <Spinner />} {/* Show Spinner when loading is true */}

      {downloadUrl && file && (
        <a href={downloadUrl} download={file.name.slice(0, -5) + "_updated.xlsx"} className="download-link">
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

      <GradeRuleDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={toggleDeleteRuleModal}
          onDeleteRule={handleRemoveRule}
          deletingRuleIndex={deletingRule}
          deleteAll = {handleRemoveAllRules}
          isDeleteAll={isDeleteAll}
      />
    </div>
    </>
  );
}

export default Home;