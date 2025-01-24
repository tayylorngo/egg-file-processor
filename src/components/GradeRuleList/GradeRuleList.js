import React from "react";
import "./GradeRuleList.css";
import "bootstrap/dist/css/bootstrap.css"

const GradeRuleList = ({ rules, onRemoveRule }) => {
  return (
    <div className="">
      <h4 className="text-center">Grade Criteria</h4>
      {rules.length === 0 ? (
        <p className="text-center">No criteria added yet.</p>
      ) : (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center align-middle">Grade Range</th>
              <th className="text-center align-middle">Adjusted Grade</th>
              <th className="text-center align-middle">Comment 1</th>
              <th className="text-center align-middle">Comment 2</th>
              <th className="text-center align-middle">Comment 3</th>
              <th className="text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index}>
                <td className="text-center align-middle">
                  {rule.minGrade} - {rule.maxGrade}
                </td>
                <td className="text-center align-middle">{rule.changeTo}</td>
                <td className="text-center align-middle">{rule.comments[0]}</td>
                <td className="text-center align-middle">{rule.comments[1]}</td>
                <td className="text-center align-middle">{rule.comments[2]}</td>
                <td className="text-center align-middle">
                  <button
                    onClick={() => onRemoveRule(index)}
                    className="btn btn-danger btn-sm"
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