import React, { useState } from "react";
import "./GradeRuleModal.css"; // Import modal styles

const GradeRuleModal = ({ isOpen, onClose, onAddRule }) => {
  const [newRule, setNewRule] = useState({ min: "", max: "", changeTo: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRule({ ...newRule, [name]: value });
  };

  const handleAddRule = () => {
    if (!newRule.min || !newRule.max || !newRule.changeTo) {
      alert("Please fill in all fields.");
      return;
    }
    onAddRule(newRule); // Pass the new rule back to the parent
    setNewRule({ min: "", max: "", changeTo: "" }); // Reset the form
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add a Grade Rule</h2>
        <div className="form-group">
          <label>Min Grade:</label>
          <input
            type="number"
            name="min"
            value={newRule.min}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Max Grade:</label>
          <input
            type="number"
            name="max"
            value={newRule.max}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Change To:</label>
          <input
            type="number"
            name="changeTo"
            value={newRule.changeTo}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAddRule} className="btn">Add Rule</button>
        <button onClick={onClose} className="btn">Close</button>
      </div>
    </div>
  );
};

export default GradeRuleModal;