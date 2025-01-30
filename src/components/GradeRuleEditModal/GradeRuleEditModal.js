import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import "../GradeRuleModal/GradeRuleModal.css"; // Ensure it shares the same styles
import commentsData from "../comments.json";
import specialGradesData from "../specialGrades.json";
import "bootstrap/dist/css/bootstrap.css";

const generateGradeOptions = () => {
  let options = Array.from({ length: 101 }, (_, i) => ({
    value: i,
    label: i.toString(),
  }));
  return [options, [...options].reverse()];
};

const GradeRuleEditModal = ({ isOpen, onClose, onEditRule, rules, editedRuleIndex }) => {
  const [minGrade, setMinGrade] = useState(null);
  const [maxGrade, setMaxGrade] = useState(null);
  const [changeTo, setChangeTo] = useState(null);
  const [specialGrade, setSpecialGrade] = useState(null);
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");

  const [commentOptions, setCommentOptions] = useState([]);
  const [specialGrades, setSpecialGrades] = useState([]);
  const gradeOptions = generateGradeOptions();

  // Reset form logic
  const resetForm = useCallback(() => {
    const rule = rules[editedRuleIndex] || {};
    
    setMinGrade(rule.minGrade !== null ? { value: rule.minGrade, label: rule.minGrade.toString() } : null);
    setMaxGrade(rule.maxGrade !== null ? { value: rule.maxGrade, label: rule.maxGrade.toString() } : null);
    setChangeTo(rule.changeTo !== "N/A" ? { value: rule.changeTo, label: rule.changeTo } : null);
    setSpecialGrade(rule.specialGrade ? { value: rule.specialGrade.value, label: rule.specialGrade.label } : null);
    setComment1(rule.comments?.[0] || "");
    setComment2(rule.comments?.[1] || "");
    setComment3(rule.comments?.[2] || "");
  }, [editedRuleIndex, rules]);

  // Load options from JSON
  useEffect(() => {
    setCommentOptions(Object.entries(commentsData).map(([code, description]) => ({
      value: code,
      label: `${code} - ${description}`,
    })));

    setSpecialGrades(Object.entries(specialGradesData).map(([code, description]) => ({
      value: code,
      label: `${code} - ${description}`,
    })));
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
    const rulesCopy = rules.filter((_, index) => index !== editedRuleIndex);

    return rulesCopy.some((rule) => {
      const newHasGrades = newRule.minGrade !== null && newRule.maxGrade !== null;
      const ruleHasGrades = rule.minGrade !== null && rule.maxGrade !== null;

      // Case 1: Both have numeric grades → Check overlap
      if (newHasGrades && ruleHasGrades) {
        return (
          (newRule.minGrade >= rule.minGrade && newRule.minGrade <= rule.maxGrade) ||
          (newRule.maxGrade >= rule.minGrade && newRule.maxGrade <= rule.maxGrade) ||
          (rule.minGrade >= newRule.minGrade && rule.minGrade <= newRule.maxGrade) ||
          (rule.maxGrade >= newRule.minGrade && rule.maxGrade <= newRule.maxGrade)
        );
      }

      // Case 2: Both rules have special grades → Check duplicate
      if (!newHasGrades && !ruleHasGrades) {
        return newRule.specialGrade.value === rule.specialGrade.value;
      }

      return false;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newRule = {};
    if (specialGrade) {
      newRule = {
        minGrade: null,
        maxGrade: null,
        changeTo: Number(changeTo?.value) || "N/A",
        specialGrade,
        comments: [comment1 || "N/A", comment2 || "N/A", comment3 || "N/A"],
      };
    } else {
      newRule = {
        minGrade: Number(minGrade?.value),
        maxGrade: Number(maxGrade?.value),
        changeTo: Number(changeTo?.value) || "N/A",
        specialGrade: null,
        comments: [comment1 || "N/A", comment2 || "N/A", comment3 || "N/A"],
      };
    }

    if (!minGrade && !maxGrade && !specialGrade) {
      alert("Please fill in a minimum and maximum grade or a special grade.");
      return;
    }

    if (minGrade && maxGrade && Number(minGrade?.value) > Number(maxGrade?.value)) {
      alert("Minimum grade cannot be greater than maximum grade.");
      return;
    }

    if (doesOverlap(newRule, rules)) {
      alert("Grade range overlaps with an existing rule.");
      return;
    }

    onEditRule(newRule);
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay centered-modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit Grade Criteria</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half-width">
              <label>Min Grade:</label>
              <Select options={gradeOptions[0]} value={minGrade} onChange={setMinGrade} isClearable isDisabled={specialGrade !== null} />
            </div>
            <div className="form-group half-width">
              <label>Max Grade:</label>
              <Select options={gradeOptions[1]} value={maxGrade} onChange={setMaxGrade} isClearable isDisabled={specialGrade !== null} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Special Grade:</label>
              <Select options={specialGrades} value={specialGrade} onChange={setSpecialGrade} isClearable isDisabled={minGrade !== null || maxGrade !== null || changeTo !== null} />
            </div>

            <div className="form-group">
              <label>Change To:</label>
              <Select options={gradeOptions[0]} value={changeTo} onChange={setChangeTo} isClearable isDisabled={specialGrade !== null} />
            </div>
          </div>    

          {/* Comment Fields */}
          {[comment1, comment2, comment3].map((comment, index) => (
            <div className="form-group" key={index}>
              <label>Comment Code {index + 1}:</label>
              <Select
                options={commentOptions}
                value={commentOptions.find((option) => option.value === comment)}
                onChange={(option) => {
                  if (index === 0) setComment1(option?.value || "");
                  if (index === 1) setComment2(option?.value || "");
                  if (index === 2) setComment3(option?.value || "");
                }}
                isClearable
              />
            </div>
          ))}

          <div className="text-center row form-group">
            <button type="submit" className="btn btn-warning mb-1">Edit</button>
            <button type="button" className="btn btn-danger" onClick={closeAndResetForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default GradeRuleEditModal;
