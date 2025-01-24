import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./GradeRuleModal.css";
import commentsData from "./comments.json";

const generateGradeOptions = () => {
  return Array.from({ length: 101 }, (_, i) => ({ value: i, label: i.toString() }));
};

const GradeRuleModal = ({ isOpen, onClose, onAddRule }) => {
  const [minGrade, setMinGrade] = useState({ value: 0, label: "0" });
  const [maxGrade, setMaxGrade] = useState({ value: 100, label: "100" });
  const [changeTo, setChangeTo] = useState(null);
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");

  const [commentOptions, setCommentOptions] = useState([]);
  const gradeOptions = generateGradeOptions();

  useEffect(() => {
    // Load comment options from JSON
    const options = Object.entries(commentsData).map(([code, description]) => ({
      value: code,
      label: `${code} - ${description}`,
    }));
    setCommentOptions(options);
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetForm(); // Reset the form every time the modal is opened
    }
  }, [isOpen]);

  const closeAndResetForm = () => {
    resetForm();
    onClose();
  }

  const resetForm = () => {
    setMinGrade({ value: 0, label: "0" });
    setMaxGrade({ value: 100, label: "100" });
    setChangeTo(null);
    setComment1("");
    setComment2("");
    setComment3("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
    const newRule = {
      minGrade: minGrade.value,
      maxGrade: maxGrade.value,
      changeTo: changeTo ? changeTo.value : "N/A",
      comments: [comment1 || "N/A", comment2 || "N/A", comment3 || "N/A"],
    };
    onAddRule(newRule);
    onClose(); // Close the modal after submitting
  };

  const customFilter = (option, inputValue) => {
    return (
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.value.toString().includes(inputValue)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay centered-modal">
      <div className="modal-content">
        <h2>Add Grade Rule</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half-width">
              <label>Min Grade:</label>
              <Select
                options={gradeOptions}
                value={minGrade}
                onChange={(option) => setMinGrade(option)}
                filterOption={customFilter}
                placeholder="Select or type a grade..."
              />
            </div>

            <div className="form-group half-width">
              <label>Max Grade:</label>
              <Select
                options={gradeOptions}
                value={maxGrade}
                onChange={(option) => setMaxGrade(option)}
                filterOption={customFilter}
                placeholder="Select or type a grade..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>Change To (Optional):</label>
            <Select
              options={gradeOptions}
              value={changeTo}
              onChange={(option) => setChangeTo(option)}
              filterOption={customFilter}
              isClearable
              placeholder="Select or type a grade..."
            />
          </div>

          <div className="form-group">
            <label>Comment Code 1 (Optional):</label>
            <Select
              options={commentOptions}
              value={commentOptions.find((option) => option.value === comment1)}
              onChange={(option) => setComment1(option?.value || "")}
              isClearable
              filterOption={customFilter}
              placeholder="Type or select a comment..."
            />
          </div>

          <div className="form-group">
            <label>Comment Code 2 (Optional):</label>
            <Select
              options={commentOptions}
              value={commentOptions.find((option) => option.value === comment2)}
              onChange={(option) => setComment2(option?.value || "")}
              isClearable
              filterOption={customFilter}
              placeholder="Type or select a comment..."
            />
          </div>

          <div className="form-group">
            <label>Comment Code 3 (Optional):</label>
            <Select
              options={commentOptions}
              value={commentOptions.find((option) => option.value === comment3)}
              onChange={(option) => setComment3(option?.value || "")}
              isClearable
              filterOption={customFilter}
              placeholder="Type or select a comment..."
            />
          </div>

          <button type="submit" className="btn">
            Add Rule
          </button>
          <button type="button" className="btn btn-small" onClick={closeAndResetForm}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeRuleModal;
