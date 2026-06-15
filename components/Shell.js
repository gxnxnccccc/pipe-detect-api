"use client";
import { Icons } from "./Icons";

export function Sidebar({ route, onNav, operator }) {
  const I = Icons;
  const items = [
    { key: "detect", label: "New Detection", icon: I.scan },
    { key: "dashboard", label: "Dashboard", icon: I.grid },
    { key: "records", label: "Detection Records", icon: I.records, badge: "892" },
  ];
  const active = route === "success" ? "detect" : route;
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">{I.logo({ size: 20 })}</div>
        <div>
          <div className="brand-name">SPDS</div>
          <div className="brand-sub">STEEL&nbsp;PIPE&nbsp;DETECTION</div>
        </div>
      </div>

      <div className="nav-label">Workspace</div>
      {items.map((it) => (
        <button
          key={it.key}
          className={"nav-item" + (active === it.key ? " active" : "")}
          onClick={() => onNav(it.key)}
        >
          {it.icon({ size: 18 })}
          <span>{it.label}</span>
          {it.badge && <span className="nav-badge">{it.badge}</span>}
        </button>
      ))}

      <div className="sidebar-foot">
        <div className="op-card">
          <div className="op-avatar">{operator.initials}</div>
          <div style={{ minWidth: 0 }}>
            <div className="op-name">{operator.name}</div>
            <div className="op-role">{operator.id} · {operator.shift}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function Topbar({ title, onLogout }) {
  const I = Icons;
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <div className="brand-mark" style={{ width: 32, height: 32, borderRadius: 9 }}>{I.logo({ size: 17 })}</div>
        <span className="topbar-brand-name">SPDS</span>
      </div>
      <div className="topbar-title">
        <h1>{title}</h1>
      </div>
      <div className="topbar-status">
        <span className="statuspill">{I.wifi({ size: 14 })} API <span className="dot ok" style={{ marginLeft: 2 }}></span></span>
        <span className="statuspill">{I.camera({ size: 14 })} Camera Ready</span>
        <span className="statuspill"><span className="dot live"></span> Live</span>
      </div>
      <button className="btn btn-ghost topbar-logout" style={{ height: 38, padding: "0 14px" }} onClick={onLogout}>
        {I.logout({ size: 16 })} <span className="logout-label">Logout</span>
      </button>
    </header>
  );
}

export function MobileNav({ route, onNav }) {
  const I = Icons;
  const items = [
    { key: "detect", label: "Detect", icon: I.scan },
    { key: "dashboard", label: "Dashboard", icon: I.grid },
    { key: "records", label: "Records", icon: I.records },
  ];
  const active = route === "success" ? "detect" : route;
  return (
    <nav className="mobilenav">
      {items.map((it) => (
        <button
          key={it.key}
          className={"mnav-item" + (active === it.key ? " active" : "")}
          onClick={() => onNav(it.key)}
        >
          {it.icon({ size: 21 })}
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
