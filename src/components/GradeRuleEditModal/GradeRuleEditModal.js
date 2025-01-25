import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
// import "./GradeRuleModal.css";
import commentsData from "../comments.json";
import "bootstrap/dist/css/bootstrap.css";

const generateGradeOptions = () => {
  let options = Array.from({ length: 101 }, (_, i) => ({
    value: i,
    label: i.toString(),
  }));
  return [options, [...options].reverse()];
};

const GradeRuleEditModal = ({
  isOpen,
  onClose,
  onEditRule,
  rules,
  editedRuleIndex,
}) => {
  const [minGrade, setMinGrade] = useState({ value: 0, label: "0" });
  const [maxGrade, setMaxGrade] = useState({ value: 100, label: "100" });
  const [changeTo, setChangeTo] = useState(null);
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");

  const [commentOptions, setCommentOptions] = useState([]);
  const gradeOptions = generateGradeOptions();

  // Reset form logic wrapped in useCallback for a stable reference
  const resetForm = useCallback(() => {
    const rule = rules[editedRuleIndex] || {};
    const minGrade = rule.minGrade || 0;
    const maxGrade = rule.maxGrade || 100;
    const changeTo = (rule.changeTo === "N/A" || null) ? null : rule.changeTo;
    const c1 = rule.comments?.[0] || "";
    const c2 = rule.comments?.[1] || "";
    const c3 = rule.comments?.[2] || "";

    setMinGrade({ value: minGrade, label: minGrade.toString() });
    setMaxGrade({ value: maxGrade, label: maxGrade.toString() });
    setChangeTo(changeTo ? { value: changeTo, label: changeTo } : null);
    setComment1(c1);
    setComment2(c2);
    setComment3(c3);
  }, [editedRuleIndex, rules]);

  // Load comment options from JSON
  useEffect(() => {
    const options = Object.entries(commentsData).map(([code, description]) => ({
      value: code,
      label: `${code} - ${description}`,
    }));
    setCommentOptions(options);
  }, []);

  // Reset the form when the modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const closeAndResetForm = () => {
    resetForm();
    onClose();
  };

  const doesOverlap = (newRule, rules) => {
    // Create a copy of the rules array without the edited rule
    const rulesCopy = rules.filter((_, index) => index !== editedRuleIndex);
  
    // Check for overlaps in the copied array
    return rulesCopy.some((rule) => {
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
  
    const newRule = {
      minGrade: minGrade?.value,
      maxGrade: maxGrade?.value,
      changeTo: changeTo?.value || "N/A",
      comments: [comment1 || "N/A", comment2 || "N/A", comment3 || "N/A"],
    };
  
    if (minGrade?.value > maxGrade?.value) {
      alert(
        "Minimum grade cannot be greater than maximum grade. Please adjust the range."
      );
      return;
    }
  
    const existingRules = Array.isArray(rules) ? rules : [];
    if (doesOverlap(newRule, existingRules)) {
      alert(
        "Grade range overlaps with an existing rule. Please adjust the range."
      );
      return;
    }
    onEditRule(newRule); // Pass the updated rules to the parent
    onClose(-1);
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
        <h2 className="modal-title">Edit Grade Criteria</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half-width">
              <label>Min Grade:</label>
              <Select
                options={gradeOptions[0]}
                value={minGrade}
                onChange={(option) => setMinGrade(option)}
                onInputChange={(inputValue) => {
                    // Allow only valid numeric inputs within range
                    const value = parseInt(inputValue, 10);
                    if (!isNaN(value) && value >= 0 && value <= 100) {
                    setMinGrade({ value: value.toString(), label: value.toString() });
                    }
                }}
                onBlur={() => {
                    // Fallback to a valid value if out of range
                    const value = parseInt(minGrade?.value, 10);
                    if (isNaN(value) || value < 0) {
                    setMinGrade({ value: "0", label: "0" });
                    } else if (value > 100) {
                    setMinGrade({ value: "100", label: "100" });
                    } else {
                    setMinGrade({
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

            <div className="form-group half-width">
              <label>Max Grade:</label>
              <Select
                options={gradeOptions[1]}
                value={maxGrade}
                onChange={(option) => setMaxGrade(option)}
                onInputChange={(inputValue) => {
                    const value = parseInt(inputValue, 10);
                    if (!isNaN(value) && value >= 0 && value <= 100) {
                    setMaxGrade({ value: value.toString(), label: value.toString() });
                    }
                }}
                onBlur={() => {
                    const value = parseInt(maxGrade?.value, 10);
                    if (isNaN(value) || value < 0) {
                    setMaxGrade({ value: "0", label: "0" });
                    } else if (value > 100) {
                    setMaxGrade({ value: "100", label: "100" });
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
                    const value = parseInt(inputValue, 10);
                    if (!isNaN(value) && value >= 0 && value <= 100) {
                    setChangeTo({ value: value.toString(), label: value.toString() });
                    }
                }}
                onBlur={() => {
                    const value = parseInt(changeTo?.value, 10);
                    if (isNaN(value) || value < 0) {
                    setChangeTo(null); // Reset to null if invalid
                    } else if (value > 100) {
                    setChangeTo({ value: "100", label: "100" });
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
            <button type="submit" className="btn btn-warning mb-1">
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeAndResetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradeRuleEditModal;
