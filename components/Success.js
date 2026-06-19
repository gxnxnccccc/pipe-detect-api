"use client";
import { Icons } from "./Icons";

export default function SuccessScreen({ record, onNew, onDashboard }) {
  const I = Icons;
  const rows = [
    ["DO Number", record.doNum, true],
    ["Actual Amount", record.actual, true],
    ["Detected Amount", record.count, true],
    ["Confidence", record.confidence + "%", true],
    ["Variance", (record.actual - record.count >= 0 ? "+" : "") + (record.actual - record.count), true],
    ["Notes", record.notes, false],
  ];

  return (
    <div className="success fade-up">
      <div className="success-card card">
        <div className="success-top">
          <div className="success-ring">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle className="ring-bg" cx="40" cy="40" r="35" />
              <circle className="ring-fg" cx="40" cy="40" r="35" />
            </svg>
            <span className="success-check"><span style={{ display: "inline-flex", transform: "rotate(90deg)" }}>{I.check({ size: 32, sw: 2.6 })}</span></span>
          </div>
          <h2>Submitted Successfully</h2>
          <p>Detection result for <span className="mono">{record.doNum}</span> has been logged to the database.</p>
          <span className="badge ok" style={{ marginTop: 4 }}>
            <span className="dot ok"></span> Record #DO-45893 created · 14:32:41
          </span>
        </div>

        <div className="summary">
          <div className="summary-head">
            <span className="eyebrow">Submission summary</span>
          </div>
          <div className="summary-rows">
            {rows.map(([k, v, mono]) => (
              <div className="summary-row" key={k}>
                <span className="summary-k">{k}</span>
                <span className={"summary-v" + (mono ? " mono" : "")}>{v || "—"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="success-actions">
          <button className="btn btn-primary btn-lg" onClick={onNew}>
            {I.plus({ size: 18 })} Start New Detection
          </button>
          <button className="btn btn-ghost btn-lg" onClick={onDashboard}>
            {I.grid({ size: 17 })} View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
