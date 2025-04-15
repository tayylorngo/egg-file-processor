import React, { useState, useEffect } from "react";
import GradeRuleModal from "../../components/GradeRuleModal/GradeRuleModal";
import GradeRuleList from "../../components/GradeRuleList/GradeRuleList";
import GradeRuleEditModal from "../../components/GradeRuleEditModal/GradeRuleEditModal";
import GradeRuleDeleteModal from "../../components/GradeRuleDeleteModal/GradeRuleDeleteModal";
import Spinner from '../../components/Spinner/Spinner';
import "../../App.css";
import "bootstrap/dist/css/bootstrap.css"

function Home() {
  
  const [grades, setGrades] = useState("");
  const [absences, setAbsences] = useState("");
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

  const handleProcessGrades = async () => {
    if (!grades.trim()) {
      setMessage("Please enter grades first!");
      return;
    }
  
    if (rules.length === 0) {
      setMessage("Please add at least one grade rule.");
      return;
    }
  
    const formData = new FormData();
    formData.append("grades", grades);
    formData.append("absences", absences);
    formData.append("rules", JSON.stringify(rules));
  
    setMessage("");
    setLoading(true);
  
    try {
      const BASE_URL = "https://swift-grades.onrender.com";
      // const BASE_URL = "http://127.0.0.1:8000"; 
      const endpoint = "/process/";
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to process grades.");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      setDownloadUrl(url);
      setMessage("Grades processed successfully! Click the button below to download the file.");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error processing grades. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

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

  const handleAddRule = (newRule) => {
    setRules((prevRules) => {
      const updatedRules = [...prevRules, newRule];
  
      return updatedRules.sort((a, b) => {
        const aHasNullGrade = a.minGrade === null || a.maxGrade === null;
        const bHasNullGrade = b.minGrade === null || b.maxGrade === null;
  
        if (!aHasNullGrade && !bHasNullGrade) {
          return a.minGrade - b.minGrade || a.maxGrade - b.maxGrade;
        }
  
        if (aHasNullGrade && !bHasNullGrade) return 1;
        if (!aHasNullGrade && bHasNullGrade) return -1;
  
        const specialA = String(a.specialGrade || ""); 
        const specialB = String(b.specialGrade || "");
  
        return specialA.localeCompare(specialB);
      });
    });
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleRemoveAllRules = () => {
    setIsDeleteAll(false);
    setRules([]);
  };

  const handleEditRule = (editedRule) => {
    setRules((rules) => {
      const newRules = [...rules];
      newRules[editingRule] = editedRule;
  
      newRules.sort((a, b) => {
        const aHasNullGrade = a.minGrade === null || a.maxGrade === null;
        const bHasNullGrade = b.minGrade === null || b.maxGrade === null;
  
        if (!aHasNullGrade && !bHasNullGrade) {
          return a.minGrade - b.minGrade || a.maxGrade - b.maxGrade;
        }
  
        if (aHasNullGrade && !bHasNullGrade) return 1;
        if (!aHasNullGrade && bHasNullGrade) return -1;
  
        const specialA = String(a.specialGrade || ""); 
        const specialB = String(b.specialGrade || "");
  
        return specialA.localeCompare(specialB);
      });
  
      return newRules;
    });
  };
  
  return (      
    <>
    <div className="container pb-1 mt-10 mb-5">
      <h1 className="fs-1">EGG File Processor</h1>
      <p className="mb-1 fs-5">Paste grades from EGG file and define your grade criteria.</p>

      <div className="d-flex gap-3">
        <textarea 
          className="form-control" 
          rows="6" 
          placeholder="Copy and paste your grades here..." 
          value={grades} 
          onChange={(e) => setGrades(e.target.value)}
          style={{ flex: "8" }}
        ></textarea>
        
        <textarea 
          className="form-control" 
          rows="6" 
          placeholder="Paste absences here (optional)..." 
          value={absences}
          onChange={(e) => setAbsences(e.target.value)}
          style={{ flex: "2" }}
        ></textarea>
      </div>

      <div className="mt-1 border border-1 mb-2 p-3 text-center">
      <GradeRuleList
          rules={rules.map(rule => ({
            minGrade: rule.minGrade,
            maxGrade: rule.maxGrade,
            changeTo: rule.changeTo,
            specialGrade: rule.specialGrade,
            comments: rule.comments,
            absenceRange: rule.absenceRange
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

    <button onClick={handleProcessGrades} className="btn btn-success mt-3 w-100">
        Process Grades
    </button>


      <p className="message mt-3">{message}</p>

      {loading && <Spinner />} 
      
      {downloadUrl && (
        <a href={downloadUrl} download="processed_grades.xlsx" className="btn btn-primary">
          Download Processed Grades
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