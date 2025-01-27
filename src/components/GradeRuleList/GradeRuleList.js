import {React, useEffect} from "react";
import "./GradeRuleList.css";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import commentCodes from "../comments.json";

const GradeRuleList = ({ rules, openDeleteRuleModal, openEditRuleModal }) => {

  useEffect(() => {
    // Initialize tooltips for Bootstrap 5
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
    );

    return () => {
      // Cleanup tooltips on component unmount
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

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
                {
                  rule.minGrade === rule.maxGrade ? 
                  <td className="text-center align-middle">
                      {rule.minGrade}
                  </td> 
                  : 
                  <td className="text-center align-middle">
                      {rule.minGrade +  " - " + rule.maxGrade}
                  </td>
                }
                <td className="text-center align-middle">{rule.changeTo}</td>
                <td 
                    className="text-center align-middle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={rule.comments[0] !== "N/A" ? rule.comments[0] + ": " + commentCodes[rule.comments[0]] : ""}
                >
                    {rule.comments[0]}
                </td>
                <td 
                    className="text-center align-middle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={rule.comments[1] !== "N/A" ? rule.comments[1] + ": " + commentCodes[rule.comments[1]] : ""}
                    >
                    {rule.comments[1]}
                  </td>
                <td 
                    className="text-center align-middle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={rule.comments[2] !== "N/A" ? rule.comments[2] + ": " + commentCodes[rule.comments[2]] : ""}
                    >
                    {rule.comments[2]}
                  </td>
                <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center gap-2">
                <button
                    onClick={() => openEditRuleModal(index)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteRuleModal(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
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