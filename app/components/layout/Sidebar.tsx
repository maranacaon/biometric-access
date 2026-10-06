 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../ui/Icon";
import { FingerprintGraphic } from "../ui/FingerprintGraphic";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">
          <FingerprintGraphic />
        </span>
        <span>
          BIOMETRIC<span>ACCESS</span>
        </span>
      </div>
      <nav>
        <p className="nav-label">Workspace</p>
        <Link className={`nav-item ${pathname === "/" ? "active" : ""}`} href="/">
          <Icon name="grid" />
          Overview
        </Link>
        <Link className={`nav-item ${pathname === "/users" ? "active" : ""}`} href="/users">
          <Icon name="users" />
          Employees <b>24</b>
        </Link>
        <a className="nav-item">
          <Icon name="clock" />
          History
        </a>
        <p className="nav-label settings-label">System</p>
        <a className="nav-item">
          <Icon name="settings" />
          Settings
        </a>
      </nav>
      <div className="sidebar-bottom">
        <div className="status-dot" />
        <div>
          <strong>Reader connected</strong>
          <small>BioStation 3 · USB</small>
        </div>
        <span className="online" />
      </div>
    </aside>
  );
}
