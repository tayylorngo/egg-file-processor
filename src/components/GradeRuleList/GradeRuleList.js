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
              <th>Comment 1</th>
              <th>Comment 2</th>
              <th>Comment 3</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index}>
                <td>
                  {rule.minGrade} - {rule.maxGrade}
                </td>
                <td>{rule.changeTo}</td>
                <td>{rule.comments[0]}</td>
                <td>{rule.comments[1]}</td>
                <td>{rule.comments[2]}</td>
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