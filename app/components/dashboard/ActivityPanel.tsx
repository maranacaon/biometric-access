import { AccessLog } from "../../features/biometric-reader/types";
import { Icon } from "../ui/Icon";

export function ActivityPanel({ logs }: { logs: AccessLog[] }) {
  return <aside className="activity-panel"><div className="panel-title"><div><h2>Recent activity</h2><p>Latest registered accesses</p></div><button>View all <Icon name="arrow" /></button></div><div className="activity-list">{logs.map((log, index) => <div className="activity-item" key={`${log.time}-${index}`}><div className={`activity-avatar ${log.status === "Denied" ? "denied" : ""}`}>{log.status === "Denied" ? "?" : log.person.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div className="activity-info"><strong>{log.person}</strong><small>{log.time} · Main entrance</small></div><span className={`access-status ${log.status === "Denied" ? "denied" : ""}`}><i />{log.status}</span></div>)}</div><div className="panel-footer"><span className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></span><div><strong>98.6%</strong><small>validation rate</small></div><Icon name="arrow" /></div></aside>;
}
