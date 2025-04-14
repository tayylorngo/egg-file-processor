import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import "../GradeRuleModal/GradeRuleModal.css"; // Ensure it shares the same styles
import commentsData from "../comments.json";
import specialGradesData from "../specialGrades.json";
import "bootstrap/dist/css/bootstrap.css";
import { Range } from "react-range"; // Import Range from react-range

const ABSENCE_MIN = 0;
const ABSENCE_MAX = 46;

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
  const [minAbsence, setMinAbsence] = useState(ABSENCE_MIN);
  const [maxAbsence, setMaxAbsence] = useState(ABSENCE_MAX);
  const [useAbsence, setUseAbsence] = useState(false);
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
    setUseAbsence(!!rule.absenceRange);
    setMinAbsence(rule.absenceRange?.min ?? ABSENCE_MIN);
    setMaxAbsence(rule.absenceRange?.max ?? ABSENCE_MAX);
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
        const gradesOverlap = (
          (newRule.minGrade >= rule.minGrade && newRule.minGrade <= rule.maxGrade) ||
          (newRule.maxGrade >= rule.minGrade && newRule.maxGrade <= rule.maxGrade) ||
          (rule.minGrade >= newRule.minGrade && rule.minGrade <= newRule.maxGrade) ||
          (rule.maxGrade >= newRule.minGrade && rule.maxGrade <= newRule.maxGrade)
        );

        if (gradesOverlap) {
          // Block if one has no absenceRange and the other does
          if ((!newRule.absenceRange && rule.absenceRange) || (newRule.absenceRange && !rule.absenceRange)) {
            return true;
          }

          // Allow overlap only if both absence ranges overlap
          const bothHaveAbsences = newRule.absenceRange && rule.absenceRange;

          const absencesOverlap = bothHaveAbsences
            ? (
                (newRule.absenceRange.min >= rule.absenceRange.min && newRule.absenceRange.min <= rule.absenceRange.max) ||
                (newRule.absenceRange.max >= rule.absenceRange.min && newRule.absenceRange.max <= rule.absenceRange.max) ||
                (rule.absenceRange.min >= newRule.absenceRange.min && rule.absenceRange.min <= newRule.absenceRange.max) ||
                (rule.absenceRange.max >= newRule.absenceRange.min && rule.absenceRange.max <= newRule.absenceRange.max)
              )
            : !newRule.absenceRange && !rule.absenceRange;

          return absencesOverlap;
        }
        return false;
      }

      // Case 2: Both rules have special grades → Check duplicate
      if (!newHasGrades && !ruleHasGrades) {
        const specialMatch = newRule.specialGrade.value === rule.specialGrade.value;

        const bothHaveAbsences = newRule.absenceRange && rule.absenceRange;

        const absencesOverlap = bothHaveAbsences
          ? (
              (newRule.absenceRange.min >= rule.absenceRange.min && newRule.absenceRange.min <= rule.absenceRange.max) ||
              (newRule.absenceRange.max >= rule.absenceRange.min && newRule.absenceRange.max <= rule.absenceRange.max) ||
              (rule.absenceRange.min >= newRule.absenceRange.min && rule.absenceRange.min <= newRule.absenceRange.max) ||
              (rule.absenceRange.max >= newRule.absenceRange.min && rule.absenceRange.max <= newRule.absenceRange.max)
            )
          : !newRule.absenceRange && !rule.absenceRange;

        return specialMatch && absencesOverlap;
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
        ...(useAbsence && {
          absenceRange: {
            min: minAbsence,
            max: maxAbsence,
          },
        }),
      };
    } else {
      newRule = {
        minGrade: Number(minGrade?.value),
        maxGrade: Number(maxGrade?.value),
        changeTo: Number(changeTo?.value) || "N/A",
        specialGrade: null,
        comments: [comment1 || "N/A", comment2 || "N/A", comment3 || "N/A"],
        ...(useAbsence && {
          absenceRange: {
            min: minAbsence,
            max: maxAbsence,
          },
        }),
      };
    }

    if ((minGrade == null || maxGrade == null) && specialGrade == null) {
      alert("Please fill in a minimum and maximum grade or a special grade.");
      return;
    }

    if (minGrade && maxGrade && Number(minGrade?.value) > Number(maxGrade?.value)) {
      alert("Minimum grade cannot be greater than maximum grade.");
      return;
    }

    if (doesOverlap(newRule, rules)) {
      if (!newRule.absenceRange) {
        alert("There is already a rule with this grade range that includes absence criteria. You must specify an absence range to add another rule in this range.");
      } else {
        alert("Grade and absence range overlaps with an existing rule. Please adjust the range.");
      }
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
              <Select 
                options={gradeOptions[0]} 
                value={minGrade} 
                onChange={setMinGrade} 
                isClearable 
                isDisabled={specialGrade !== null} 
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
                    setMinGrade(null); // Default fallback
                  } else if (value > 100) {
                    setMinGrade(null); // Cap to 0
                  } else {
                    setMinGrade({
                      value: value.toString(),
                      label: value.toString(),
                    }); // Ensure valid formatting
                  }
                }}
              />
            </div>
            <div className="form-group half-width">
              <label>Max Grade:</label>
              <Select 
                options={gradeOptions[1]} 
                value={maxGrade} 
                onChange={setMaxGrade} 
                isClearable 
                isDisabled={specialGrade !== null} 
                onInputChange={(inputValue) => {
                  if (!isNaN(inputValue) && inputValue.trim() !== "") {
                    setMaxGrade({ value: inputValue, label: inputValue });
                  }
                }}
                onBlur={() => {
                  const value = parseInt(maxGrade?.value, 10);
                  if (isNaN(value) || value < 0) {
                    setMaxGrade(null);
                  } else if (value > 100) {
                    setMaxGrade(null);
                  } else {
                    setMaxGrade({
                      value: value.toString(),
                      label: value.toString(),
                    });
                  }
                }}
              />
            </div>
          </div>

          <div className="form-group d-flex align-items-center">
            <label className="me-3">Use Absence Criteria:</label>
            <div className="form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="absenceToggle"
                checked={useAbsence}
                onChange={() => setUseAbsence(!useAbsence)}
                style={{ width: "2.5em", height: "1.5em" }}
              />
            </div>
          </div>

          {useAbsence && (
            <div className="form-group">
              <label>Absences: {minAbsence}-{maxAbsence}</label>
              <div style={{ margin: '1rem 0', padding: '0 1rem' }}>
                <Range
                  step={1}
                  min={ABSENCE_MIN}
                  max={ABSENCE_MAX}
                  values={[minAbsence, maxAbsence]}
                  onChange={([min, max]) => {
                    setMinAbsence(min);
                    setMaxAbsence(max);
                  }}
                  renderTrack={({ props, children }) => (
                    <div {...props} className="absence-slider-track">
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, index }) => (
                    <div {...props} className="absence-slider-thumb">
                      <span className="absence-slider-label">
                        {[minAbsence, maxAbsence][index]}
                      </span>
                    </div>
                  )}
                />
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Special Grade:</label>
              <Select options={specialGrades} value={specialGrade} onChange={setSpecialGrade} isClearable isDisabled={minGrade !== null || maxGrade !== null || changeTo !== null} />
            </div>

            <div className="form-group">
              <label>Change To:</label>
              <Select 
                options={gradeOptions[0]} 
                value={changeTo} 
                onChange={setChangeTo} 
                isClearable 
                isDisabled={specialGrade !== null} 
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
              />
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
