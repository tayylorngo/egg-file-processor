import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./GradeRuleModal.css";
import commentsData from "../comments.json";
import "bootstrap/dist/css/bootstrap.css"

const generateGradeOptions = () => {
    let options =  Array.from({ length: 101 }, (_, i) => ({ value: i, label: i.toString() }));
    return [options, [...options].reverse()];
};

const GradeRuleModal = ({ isOpen, onClose, onAddRule, rules }) => {
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

  const doesOverlap = (newRule, rules) => {
    // console.log(rules)
    // console.log(newRule)
    return rules.some((rule) => {
      return (
        (newRule.minGrade >= rule.minGrade && newRule.minGrade <= rule.maxGrade) || // New min is within an existing range
        (newRule.maxGrade >= rule.minGrade && newRule.maxGrade <= rule.maxGrade) || // New max is within an existing range
        (rule.minGrade >= newRule.minGrade && rule.minGrade <= newRule.maxGrade) || // Existing min is within the new range
        (rule.maxGrade >= newRule.minGrade && rule.maxGrade <= newRule.maxGrade)    // Existing max is within the new range
      );
    });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Constructing the rule to be added
    const newRule = {
        minGrade: Number(minGrade?.value),
        maxGrade: Number(maxGrade?.value),
        changeTo: Number(changeTo?.value) || "N/A",
        comments: [comment1 || "N/A", comment2 || "N/A", comment3 || "N/A"],
    };

    if (Number(minGrade?.value) > Number(maxGrade?.value)){
      alert("Minimum grade cannot be greater than maximum grade. Please adjust the range.")
      return;
    }

    // Checking for overlapping ranges in existing rules
    const existingRules = Array.isArray(rules) ? rules : [];
    if (doesOverlap(newRule, existingRules)) {
        alert("Grade range overlaps with an existing rule. Please adjust the range.");
        return;
    }

    // Adding the rule and resetting the form
    onAddRule(newRule);
    resetForm();
    onClose();
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
        <h2 className="modal-title">Add Grade Criteria</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half-width">
              <label>Min Grade:</label>
              <Select
                  options={gradeOptions[0]}
                  value={minGrade}
                  onChange={(option) => setMinGrade(option)} // Updates when an option is selected
                  onInputChange={(inputValue) => {
                    // Allow the user to type freely without truncation
                    if (!isNaN(inputValue) && inputValue.trim() !== "") {
                      setMinGrade({ value: inputValue, label: inputValue });
                    }
                  }}
                  onBlur={() => {
                    // Validate the value when the user clicks away
                    const value = parseInt(minGrade?.value, 10);
                    if (isNaN(value) || value < 0) {
                      setMinGrade({ value: "0", label: "0" }); // Default fallback
                    } else if (value > 100) {
                      setMinGrade({ value: "0", label: "0" }); // Cap to 0
                    } else {
                      setMinGrade({
                        value: value.toString(),
                        label: value.toString(),
                      }); // Ensure valid formatting
                    }
                  }}
                  filterOption={customFilter}
                  placeholder="Select or type a grade..."
                  className="select-form"
                />
            </div>

            <div className="form-group half-width">
              <label>Max Grade:</label>
              <Select
                  options={gradeOptions[1]}
                  value={maxGrade}
                  onChange={(option) => setMaxGrade(option)}
                  onInputChange={(inputValue) => {
                    if (!isNaN(inputValue) && inputValue.trim() !== "") {
                      setMaxGrade({ value: inputValue, label: inputValue });
                    }
                  }}
                  onBlur={() => {
                    const value = parseInt(maxGrade?.value, 10);
                    if (isNaN(value) || value < 0) {
                      setMaxGrade({ value: "0", label: "0" });
                    } else if (value > 100) {
                      setMaxGrade({ value: "0", label: "0" });
                    } else {
                      setMaxGrade({
                        value: value.toString(),
                        label: value.toString(),
                      });
                    }
                  }}
                  filterOption={customFilter}
                  placeholder="Select or type a grade..."
                  className="select-form"
                />
            </div>
          </div>

          <div className="form-group">
            <label>Change To:</label>
            <Select
              options={gradeOptions[0]}
              value={changeTo}
              onChange={(option) => setChangeTo(option)}
              onInputChange={(inputValue) => {
                if (!isNaN(inputValue) && inputValue.trim() !== "") {
                  setChangeTo({ value: inputValue, label: inputValue });
                }
              }}
              onBlur={() => {
                const value = parseInt(changeTo?.value, 10);
                if (isNaN(value) || value < 0) {
                  setChangeTo(null); // Reset to null if invalid
                } else if (value > 100) {
                  setChangeTo(null);
                } else {
                  setChangeTo({
                    value: value.toString(),
                    label: value.toString(),
                  });
                }
              }}
              filterOption={customFilter}
              placeholder="Select or type a grade..."
              className="select-form"
              isClearable
            />
          </div>

          <div className="form-group">
            <label>Comment Code 1:</label>
            <Select
              options={commentOptions}
              value={commentOptions.find((option) => option.value === comment1)}
              onChange={(option) => setComment1(option?.value || "")}
              isClearable
              filterOption={customFilter}
              placeholder="Type or select a comment..."
              className="select-form"
            />
          </div>

          <div className="form-group">
            <label>Comment Code 2:</label>
            <Select
              options={commentOptions}
              value={commentOptions.find((option) => option.value === comment2)}
              onChange={(option) => setComment2(option?.value || "")}
              isClearable
              filterOption={customFilter}
              placeholder="Type or select a comment..."
              className="select-form"
            />
          </div>

          <div className="form-group">
            <label>Comment Code 3:</label>
            <Select
              options={commentOptions}
              value={commentOptions.find((option) => option.value === comment3)}
              onChange={(option) => setComment3(option?.value || "")}
              isClearable
              filterOption={customFilter}
              placeholder="Type or select a comment..."
              className="select-form"
            />
          </div>
          <div className="text-center row form-group">
            <button type="submit" className="btn btn-success mb-1">
              Add
            </button>
            <button type="button" className="btn btn-danger" onClick={closeAndResetForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradeRuleModal;
