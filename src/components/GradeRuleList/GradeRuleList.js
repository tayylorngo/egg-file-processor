import {React} from "react";
import "./GradeRuleList.css";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import commentCodes from "../comments.json";

const GradeRuleList = ({ rules, openDeleteRuleModal, openEditRuleModal }) => {
  const sortedRules = [...rules].sort((a, b) => {
    const aHasGrades = a.minGrade !== null && a.maxGrade !== null;
    const bHasGrades = b.minGrade !== null && b.maxGrade !== null;

    // Handle rules with special grades
    if (!aHasGrades && !bHasGrades) {
      const aSpecial = String(a.specialGrade?.value || "");
      const bSpecial = String(b.specialGrade?.value || "");
      if (aSpecial !== bSpecial) return aSpecial.localeCompare(bSpecial);

      // If special grades are the same, sort by absenceRange
      if (a.absenceRange && b.absenceRange) {
        return a.absenceRange.min - b.absenceRange.min;
      } else if (a.absenceRange) {
        return 1;
      } else if (b.absenceRange) {
        return -1;
      }
      return 0;
    }

    if (!aHasGrades) return 1;
    if (!bHasGrades) return -1;

    // Compare by grade range
    if (a.minGrade !== b.minGrade) return a.minGrade - b.minGrade;
    if (a.maxGrade !== b.maxGrade) return a.maxGrade - b.maxGrade;

    // Then by absenceRange
    if (a.absenceRange && b.absenceRange) {
      return a.absenceRange.min - b.absenceRange.min;
    } else if (a.absenceRange) {
      return 1;
    } else if (b.absenceRange) {
      return -1;
    }

    return 0;
  });

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
              <th className="text-center align-middle">Absences</th>
              <th className="text-center align-middle">Adjusted Grade</th>
              <th className="text-center align-middle">C1</th>
              <th className="text-center align-middle">C2</th>
              <th className="text-center align-middle">C3</th>
              <th className="text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRules.map((rule, index) => (
              <tr key={index}>
                {
                  rule.specialGrade != null ? 
                  <td className="text-center align-middle">
                    {rule.specialGrade.value}
                  </td> 
                  :
                  rule.minGrade === rule.maxGrade ? 
                  <td className="text-center align-middle">
                      {rule.minGrade}
                  </td> 
                  : 
                  <td className="text-center align-middle">
                      {rule.minGrade +  " - " + rule.maxGrade}
                  </td>
                }
                <td className="text-center align-middle">
                  {rule.absenceRange ? `${rule.absenceRange.min} - ${rule.absenceRange.max}` : "—"}
                </td>
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
                    onClick={() => openEditRuleModal(rules.indexOf(rule))}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteRuleModal(index, false)}
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