import React from "react";
import "./GradeRuleList.css";

const GradeRuleList = ({ rules, onRemoveRule }) => {
  return (
    <div className="rules">
      <h3>Grade Rules:</h3>
      {rules.length === 0 ? (
        <p>No rules added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Grade Range</th>
              <th>Adjusted Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index}>
                <td>
                  {rule.min} - {rule.max}
                </td>
                <td>{rule.changeTo}</td>
                <td>
                  <button
                    onClick={() => onRemoveRule(index)}
                    className="btn-small"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GradeRuleList;
