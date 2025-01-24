import React, { useState } from "react";
import "./GradeRuleModal.css";

const GradeRuleModal = ({ isOpen, onClose, onAddRule }) => {
  const [newRule, setNewRule] = useState({ min: "", max: "", changeTo: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers between 0 and 100
    if (name === "min" || name === "max" || name === "changeTo") {
      if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
        setNewRule({ ...newRule, [name]: value });
      }
    } else {
      setNewRule({ ...newRule, [name]: value });
    }
  };

  const handleAddRule = () => {
    if (!newRule.min || !newRule.max || !newRule.changeTo) {
      alert("Please fill in all fields.");
      return;
    }

    // Ensure min <= max
    if (Number(newRule.min) > Number(newRule.max)) {
      alert("Minimum grade cannot be greater than maximum grade.");
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
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label>Max Grade:</label>
          <input
            type="number"
            name="max"
            value={newRule.max}
            onChange={handleInputChange}
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label>Change To:</label>
          <input
            type="number"
            name="changeTo"
            value={newRule.changeTo}
            onChange={handleInputChange}
            min="0"
            max="100"
          />
        </div>
        <button onClick={handleAddRule} className="btn">Add Rule</button>
        <button onClick={onClose} className="btn">Close</button>
      </div>
    </div>
  );
};

export default GradeRuleModal;
