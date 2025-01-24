// Updated GradeRuleModal component to support 3 comment codes per grade range with centered modal.
import React, { useState } from "react";
import "./GradeRuleModal.css";

const GradeRuleModal = ({ isOpen, onClose, onAddRule }) => {
  const [minGrade, setMinGrade] = useState(0);
  const [maxGrade, setMaxGrade] = useState(100);
  const [changeTo, setChangeTo] = useState("");
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRule = {
      minGrade,
      maxGrade,
      changeTo: changeTo ? parseInt(changeTo) : "N/A",
      comments: [comment1 || "N/A", comment2 || "N/A", comment3 || "N/A"],
    };
    onAddRule(newRule);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setMinGrade();
    setMaxGrade();
    setChangeTo("");
    setComment1("");
    setComment2("");
    setComment3("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay centered-modal">
      <div className="modal-content">
        <h2>Add Grade Rule</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Min Grade:</label>
            <input
              type="number"
              value={minGrade}
              min="0"
              max="100"
              onChange={(e) => setMinGrade(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label>Max Grade:</label>
            <input
              type="number"
              value={maxGrade}
              min="0"
              max="100"
              onChange={(e) => setMaxGrade(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label>Change To (Optional):</label>
            <input
              type="number"
              value={changeTo}
              min="0"
              max="100"
              onChange={(e) => setChangeTo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Comment Code 1 (Optional):</label>
            <input
              type="text"
              value={comment1}
              onChange={(e) => setComment1(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Comment Code 2 (Optional):</label>
            <input
              type="text"
              value={comment2}
              onChange={(e) => setComment2(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Comment Code 3 (Optional):</label>
            <input
              type="text"
              value={comment3}
              onChange={(e) => setComment3(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">
            Add Rule
          </button>
          <button type="button" className="btn btn-small" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeRuleModal;
