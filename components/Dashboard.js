"use client";
import { Icons } from "./Icons";

function Metric({ icon, label, value, sub, trend, dir }) {
  const I = Icons;
  return (
    <div className="card metric">
      <div className="metric-top">
        <span className="metric-label">{label}</span>
        <span className="metric-ico">{icon}</span>
      </div>
      <div className="metric-value mono">{value}</div>
      <div className="metric-foot">
        <span className="metric-sub">{sub}</span>
        {trend && (
          <span className={"metric-trend " + dir}>
            {dir === "up"
              ? I.trendUp({ size: 13 })
              : I.trendUp({ size: 13, style: { transform: "scaleY(-1)" } })}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function BarChart() {
  const data = [12, 8, 15, 23, 41, 37, 50, 45];
  const labels = ["00", "02", "04", "06", "08", "10", "12", "14"];
  const max = 60;
  const W = 560, H = 230, padL = 34, padB = 26, padT = 10;
  const cw = (W - padL) / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" preserveAspectRatio="none">
      {[0, 15, 30, 45, 60].map((g) => {
        const y = padT + (1 - g / max) * (H - padT - padB);
        return (
          <g key={g}>
            <line x1={padL} y1={y} x2={W} y2={y} className="grid" strokeDasharray="3 4" />
            <text x={padL - 8} y={y + 3} className="axis" textAnchor="end">{g}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d / max) * (H - padT - padB);
        const x = padL + i * cw + cw * 0.22;
        const w = cw * 0.56;
        const y = padT + (H - padT - padB) - h;
        const isPeak = d === Math.max(...data);
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="4" className={isPeak ? "bar peak" : "bar"} />
            <text x={x + w / 2} y={H - 8} className="axis" textAnchor="middle">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart() {
  const data = [96.1, 96.8, 95.6, 96.9, 97.4, 97.9, 97.4, 97.2];
  const labels = ["22", "23", "24", "25", "26", "27", "28", "29"];
  const min = 94, max = 99;
  const W = 560, H = 230, padL = 36, padB = 26, padT = 12, padR = 8;
  const px = (i) => padL + (i / (data.length - 1)) * (W - padL - padR);
  const py = (v) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
  const pts = data.map((d, i) => [px(i), py(d)]);
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = path + ` L ${px(data.length - 1)} ${H - padB} L ${padL} ${H - padB} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.17 256)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="oklch(0.55 0.17 256)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[94, 95, 96, 97, 98, 99].map((g) => {
        const y = py(g);
        return (
          <g key={g}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} className="grid" strokeDasharray="3 4" />
            <text x={padL - 8} y={y + 3} className="axis" textAnchor="end">{g}</text>
          </g>
        );
      })}
      <path d={area} fill="url(#lg)" />
      <path d={path} className="line" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="3.5" className="ldot" />
          <text x={p[0]} y={H - 8} className="axis" textAnchor="middle">{labels[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Dashboard({ onNew }) {
  const I = Icons;
  return (
    <div className="content-wrap fade-up">
      <div className="page-head dash-head">
        <div>
          <span className="eyebrow">{I.clock({ size: 12 })} Updated 14:33 · Line A</span>
          <h2>Dashboard</h2>
          <p>System overview and key detection metrics.</p>
        </div>
        <button className="btn btn-primary" onClick={onNew}>{I.scan({ size: 17 })} New Detection</button>
      </div>

      <div className="metric-grid">
        <Metric icon={I.target({ size: 17 })} label="Total Detections Today" value="48" sub="Active sessions" trend="+12%" dir="up" />
        <Metric icon={I.trendUp({ size: 17 })} label="Average Accuracy" value="97.2%" sub="Last 24 hours" trend="-0.4%" dir="down" />
        <Metric icon={I.alert({ size: 17 })} label="Manual Corrections" value="2.8%" sub="Intervention rate" trend="-0.3%" dir="up" />
        <Metric icon={I.xCircle({ size: 17 })} label="Failed Detections" value="1" sub="Requires attention" />
      </div>

      <div className="chart-grid">
        <div className="card card-pad chart-card">
          <div className="chart-head">
            <div>
              <h3>Detection Volume</h3>
              <span className="chart-sub">Bundles processed · today, 2-hour buckets</span>
            </div>
            <span className="badge muted mono">239 total</span>
          </div>
          <BarChart />
        </div>
        <div className="card card-pad chart-card">
          <div className="chart-head">
            <div>
              <h3>Accuracy Trend</h3>
              <span className="chart-sub">Mean confidence · last 7 days</span>
            </div>
            <span className="badge ok mono">{I.trendUp({ size: 12 })} +1.1%</span>
          </div>
          <LineChart />
        </div>
      </div>
    </div>
  );
}
