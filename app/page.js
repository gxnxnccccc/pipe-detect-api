"use client";
import { useState } from "react";
import LoginScreen from "@/components/Login";
import { Sidebar, Topbar, MobileNav } from "@/components/Shell";
import DetectionWorkflow from "@/components/Workflow";
import Dashboard from "@/components/Dashboard";
import RecordsScreen from "@/components/Records";
import SuccessScreen from "@/components/Success";

const PAGE_TITLES = {
  detect: "New Detection",
  success: "Detection Submitted",
  dashboard: "Dashboard",
  records: "Detection Records",
};

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [route, setRoute] = useState("detect");
  const [operator] = useState({ name: "J. Martinez", id: "OP-2207", initials: "JM", shift: "Shift A" });
  const [lastRecord, setLastRecord] = useState(null);

  const login = () => { setAuthed(true); setRoute("detect"); };
  const logout = () => { setAuthed(false); };

  if (!authed) return <LoginScreen onLogin={login} />;

  const submit = (rec) => { setLastRecord(rec); setRoute("success"); };

  return (
    <div className="app">
      <Sidebar route={route} onNav={setRoute} operator={operator} />
      <div className="main">
        <Topbar title={PAGE_TITLES[route]} onLogout={logout} />
        <div className="content">
          {route === "detect" && (
            <div className="content-wrap">
              <DetectionWorkflow onSubmit={submit} />
            </div>
          )}
          {route === "success" && lastRecord && (
            <SuccessScreen
              record={lastRecord}
              onNew={() => setRoute("detect")}
              onDashboard={() => setRoute("dashboard")}
            />
          )}
          {route === "dashboard" && <Dashboard onNew={() => setRoute("detect")} />}
          {route === "records" && <RecordsScreen />}
        </div>
        <MobileNav route={route} onNav={setRoute} />
      </div>
    </div>
  );
}
