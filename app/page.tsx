"use client";

import { ActivityPanel } from "./components/dashboard/ActivityPanel";
import { Metrics } from "./components/dashboard/Metrics";
import { ScanCard } from "./components/biometric/ScanCard";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { useBiometricReader } from "./features/biometric-reader/useBiometricReader";

export default function Home() {
  const reader = useBiometricReader();

  return (
    <main className="shell">
      <Sidebar />
      <section className="content">
        <Topbar />
        <div className="dashboard-grid">
          <div className="primary-column">
            <div className="section-title"><div><h2>Access validation</h2><p>Start a scan to verify an identity.</p></div><span className="live-pill"><i /> LIVE</span></div>
            <ScanCard state={reader.state} step={reader.step} connection={reader.connection} onStart={reader.startScan} onReset={reader.reset} />
            <Metrics />
          </div>
          <ActivityPanel logs={reader.logs} />
        </div>
        <footer><span><span className="footer-dot" /> All systems operational</span><span>Demo environment · <a>How it works?</a></span></footer>
      </section>
    </main>
  );
}
