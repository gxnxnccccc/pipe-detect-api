"use client";
import { useState } from "react";
import { Icons } from "./Icons";

const RECORDS = [
  { ts: "2026-03-29 14:32:15", doNum: "DO-45892", op: "J. Martinez", pipes: 124, acc: 98.4, status: "Approved" },
  { ts: "2026-03-29 13:18:42", doNum: "DO-45891", op: "K. Chen", pipes: 86, acc: 97.2, status: "Approved" },
  { ts: "2026-03-29 12:05:33", doNum: "DO-45890", op: "M. Okonkwo", pipes: 142, acc: 95.8, status: "Flagged" },
  { ts: "2026-03-29 11:21:07", doNum: "DO-45889", op: "R. Patel", pipes: 98, acc: 99.1, status: "Approved" },
  { ts: "2026-03-29 10:47:29", doNum: "DO-45888", op: "J. Martinez", pipes: 156, acc: 91.2, status: "Error" },
  { ts: "2026-03-29 09:33:51", doNum: "DO-45887", op: "A. Johnson", pipes: 73, acc: 98.9, status: "Approved" },
  { ts: "2026-03-29 08:15:22", doNum: "DO-45886", op: "K. Chen", pipes: 112, acc: 96.5, status: "Approved" },
  { ts: "2026-03-29 07:42:18", doNum: "DO-45885", op: "M. Okonkwo", pipes: 89, acc: 94.3, status: "Pending" },
];

const STATUS_MAP = { Approved: "ok", Flagged: "warn", Error: "err", Pending: "info" };

export default function RecordsScreen() {
  const I = Icons;
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const tabs = ["All", "Approved", "Flagged", "Error", "Pending"];

  const filtered = RECORDS.filter((r) => {
    const mt = filter === "All" || r.status === filter;
    const mq = !q || (r.doNum + r.op).toLowerCase().includes(q.toLowerCase());
    return mt && mq;
  });

  const accClass = (a) => (a >= 97 ? "ok" : a >= 95 ? "warn" : "err");

  return (
    <div className="content-wrap fade-up">
      <div className="page-head dash-head">
        <div>
          <span className="eyebrow">{I.records({ size: 12 })} 892 records · 8 today</span>
          <h2>Detection Records</h2>
          <p>Historical detection data and submitted results.</p>
        </div>
        <button className="btn btn-ghost">{I.download({ size: 16 })} Export CSV</button>
      </div>

      <div className="rec-toolbar">
        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={"tab" + (filter === t ? " active" : "")}
              onClick={() => setFilter(t)}
            >
              {t}
              {t !== "All" && (
                <span className="tab-n mono">{RECORDS.filter((r) => r.status === t).length}</span>
              )}
            </button>
          ))}
        </div>
        <div className="search">
          {I.search({ size: 16 })}
          <input
            placeholder="Search DO # or operator…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="card rec-card">
        <div className="rec-table-scroll">
          <table className="rec-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>DO Number</th>
                <th>Operator</th>
                <th className="num">Total Pipes</th>
                <th className="num">Accuracy</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.doNum}>
                  <td className="mono ts">{r.ts}</td>
                  <td className="mono do">{r.doNum}</td>
                  <td>
                    <span className="op-cell">
                      <span className="op-chip">{r.op.split(" ").map((s) => s[0]).join("")}</span>
                      {r.op}
                    </span>
                  </td>
                  <td className="num mono">{r.pipes}</td>
                  <td className="num">
                    <span className={"acc " + accClass(r.acc)}>
                      <span className="acc-dot"></span>
                      <span className="mono">{r.acc}%</span>
                    </span>
                  </td>
                  <td><span className={"badge " + STATUS_MAP[r.status]}>{r.status}</span></td>
                  <td className="num"><button className="row-btn">{I.arrowRight({ size: 16 })}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="rec-empty">No records match your filters.</div>
        )}
        <div className="rec-foot">
          <span>Showing <span className="mono">{filtered.length}</span> of <span className="mono">{RECORDS.length}</span></span>
          <div className="pager">
            <button className="pg" disabled>{I.arrowLeft({ size: 15 })}</button>
            <span className="pg active mono">1</span>
            <span className="pg mono">2</span>
            <span className="pg mono">3</span>
            <button className="pg">{I.arrowRight({ size: 15 })}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
