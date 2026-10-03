import { Icon } from "../ui/Icon";

export function Topbar() {
  return (
    <header className="topbar">
      <div>
        <span className="eyebrow">FRIDAY, OCT 02, 2026</span>
        <h1>
          Hello, Marina <span>✦</span>
        </h1>
      </div>
      <div className="top-actions">
        <button className="icon-button">
          <Icon name="bell" />
          <i />
        </button>
        <div className="avatar">MA</div>
        <div className="profile">
          <strong>Marina Almeida</strong>
          <small>Administrator</small>
        </div>
      </div>
    </header>
  );
}
