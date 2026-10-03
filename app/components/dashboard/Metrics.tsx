import { Icon } from "../ui/Icon";

export function Metrics() {
  return (
    <div className="metric-row">
      <div className="metric-card">
        <span className="metric-icon blue">
          <Icon name="users" />
        </span>
        <div>
          <small>Active employees</small>
          <strong>24</strong>
        </div>
        <em>+8.2%</em>
      </div>
      <div className="metric-card">
        <span className="metric-icon green">
          <Icon name="check" />
        </span>
        <div>
          <small>Accesses today</small>
          <strong>148</strong>
        </div>
        <em>+12.4%</em>
      </div>
      <div className="metric-card">
        <span className="metric-icon purple">
          <Icon name="clock" />
        </span>
        <div>
          <small>Average time</small>
          <strong>1.8s</strong>
        </div>
        <em>−4.1%</em>
      </div>
    </div>
  );
}
