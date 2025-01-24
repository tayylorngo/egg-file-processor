import React from "react";

const GradeRuleList = ({ rules, onRemoveRule }) => {
  return (
    <div className="rules">
      <h3>Grade Rules:</h3>
      {rules.length === 0 && <p>No rules added yet.</p>}
      <ul>
        {rules.map((rule, index) => (
          <li key={index}>
            Grades between {rule.min} and {rule.max} will change to {rule.changeTo}
            <button onClick={() => onRemoveRule(index)} className="btn-small">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradeRuleList;
