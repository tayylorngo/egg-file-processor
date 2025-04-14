import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Range } from 'react-range';
import "./GradeRuleModal.css";
import commentsData from "../comments.json";
import specialGradesData from "../specialGrades.json";
import "bootstrap/dist/css/bootstrap.css"

const generateGradeOptions = () => {
    let options =  Array.from({ length: 101 }, (_, i) => ({ value: i, label: i.toString() }));
    return [options, [...options].reverse()];
};

const GradeRuleModal = ({ isOpen, onClose, onAddRule, rules }) => {
  const ABSENCE_MIN = 0;
  const ABSENCE_MAX = 46;

  const [minGrade, setMinGrade] = useState(null);
  const [maxGrade, setMaxGrade] = useState(null);
  const [changeTo, setChangeTo] = useState(null);
  const [specialGrade, setSpecialGrade] = useState(null);
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");
  
  const [minAbsence, setMinAbsence] = useState(0);
  const [maxAbsence, setMaxAbsence] = useState(46);
  const [useAbsence, setUseAbsence] = useState(false);

  const [commentOptions, setCommentOptions] = useState([]);
  const [specialGrades, setSpecialGrades] = useState([]);
  const gradeOptions = generateGradeOptions();

  useEffect(() => {
    // Load comment options from JSON
    const options = Object.entries(commentsData).map(([code, description]) => ({
      value: code,
      label: `${code} - ${description}`,
    }));
    setCommentOptions(options);

    const specialGradeOptions = Object.entries(specialGradesData).map(([code, description]) => ({
      value: code,
      label: `${code} - ${description}`,
    }))
    setSpecialGrades(specialGradeOptions);
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
    setMinGrade(null);
    setMaxGrade(null);
    setSpecialGrade(null);
    setChangeTo(null);
    setComment1("");
    setComment2("");
    setComment3("");
    setMinAbsence(0);
    setMaxAbsence(46);
    setUseAbsence(false);
  };

  const doesOverlap = (newRule, rules) => {
    return rules.some((rule) => {
      const newHasGrades = newRule.minGrade !== null && newRule.maxGrade !== null;
      const ruleHasGrades = rule.minGrade !== null && rule.maxGrade !== null;
  
      // Case 1: Both rules have numeric grades → Check range overlap
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
  
      // Case 2: If both rules have special grades, check for exact match
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
  
      // Case 3: If one rule has grades and the other has a special grade, they do NOT overlap
      return false;
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Constructing the rule to be added

    let newRule = {};
      if(specialGrade != null){
          newRule = {
            minGrade: null,
            maxGrade: null,
            changeTo: Number(changeTo?.value) || "N/A",
            specialGrade: specialGrade,
            comments: [comment1 || "N/A", comment2 || "N/A", comment3 || "N/A"],
            ...(useAbsence && {
              absenceRange: {
                min: minAbsence,
                max: maxAbsence,
              },
            }),
        };
      }
      else {
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
  
    if ((minGrade == null || maxGrade == null) && specialGrade == null){
      alert("Please fill in a minimum and maximum grade value.")
      return;
    }

    if (Number(minGrade?.value) > Number(maxGrade?.value)){
      alert("Minimum grade cannot be greater than maximum grade. Please adjust the range.")
      return;
    }

    if (minAbsence && maxAbsence && Number(minAbsence) > Number(maxAbsence)) {
      alert("Minimum absences cannot be greater than maximum absences.");
      return;
    }

    // Checking for overlapping ranges in existing rules
    const existingRules = Array.isArray(rules) ? rules : [];
    if (doesOverlap(newRule, existingRules)) {
        if (!newRule.absenceRange) {
          alert("There is already a rule with this grade range that includes absence criteria. You must specify an absence range to add another rule in this range.");
        } else {
          alert("Grade and absence range overlaps with an existing rule. Please adjust the range.");
        }
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
        <h3 className="modal-title">Add Grade Criteria</h3>
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
                  filterOption={customFilter}
                  placeholder="Select or type a grade..."
                  className="select-form"
                  isClearable
                  isDisabled = {specialGrade != null}
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
                  filterOption={customFilter}
                  placeholder="Select or type a grade..."
                  className="select-form"
                  isClearable
                  isDisabled = {specialGrade != null}
                />
            </div>
          </div>

          <div className="form-group d-flex align-items-center">
            <label className="me-3">Use Attendance Criteria:</label>
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
              <label>Absences: {minAbsence} - {maxAbsence}</label>
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
              <label>Special Grade: </label>
              <Select
                options={specialGrades}
                value={specialGrade}
                onChange={(option) => setSpecialGrade(option)}
                filterOption={customFilter}
                placeholder="Select or type a grade..."
                className="select-form"
                isClearable
                isDisabled = {minGrade != null || maxGrade != null || changeTo != null}
              />
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
                isDisabled = {specialGrade != null}
              />
            </div>
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
                className="select-form comment-select"
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
                className="select-form comment-select"
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
                className="select-form comment-select"
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