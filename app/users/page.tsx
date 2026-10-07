"use client";

import { FormEvent, useMemo, useState } from "react";
import { Icon } from "../components/ui/Icon";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { useUsers } from "../features/users/useUsers";
import { User, UserInput, UserRole } from "../features/users/types";

const emptyForm: UserInput = {
  name: "",
  email: "",
  role: "Operator",
  department: "",
  biometric: "Pending",
  status: "Active",
};

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export default function UsersPage() {
  const { users, addUser, updateUser, toggleStatus, removeUser } = useUsers();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<"All roles" | UserRole>("All roles");
  const [editing, setEditing] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const matchesQuery = `${user.name} ${user.email} ${user.department}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesQuery && (role === "All roles" || user.role === role);
      }),
    [query, role, users],
  );

  function submitUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const input: UserInput = {
      name: String(form.get("name")),
      email: String(form.get("email")),
      department: String(form.get("department")),
      role: form.get("role") as UserRole,
      biometric: form.get("biometric") as UserInput["biometric"],
      status: form.get("status") as UserInput["status"],
    };
    if (editing) updateUser(editing.id, input);
    else addUser(input);
    setEditing(null);
    setIsAdding(false);
  }

  const activeCount = users.filter((user) => user.status === "Active").length;
  const enrolledCount = users.filter((user) => user.biometric === "Enrolled").length;
  const formUser = editing ?? (isAdding ? { ...emptyForm, id: "", lastAccess: "" } : null);

  return (
    <main className="shell">
      <Sidebar />
      <section className="content users-content">
        <Topbar />
        <div className="users-heading">
          <div>
            <span className="eyebrow">ACCESS CONTROL</span>
            <h2>Users & employees</h2>
            <p>Manage people who can access your facilities.</p>
          </div>
          <button className="primary-action" onClick={() => setIsAdding(true)}>
            <Icon name="plus" /> Add user
          </button>
        </div>

        <div className="user-stats">
          <div><span className="stat-icon blue"><Icon name="users" /></span><small>Total users</small><strong>{users.length}</strong></div>
          <div><span className="stat-icon green"><Icon name="check" /></span><small>Active users</small><strong>{activeCount}</strong></div>
          <div><span className="stat-icon purple"><Icon name="finger" /></span><small>Biometrics enrolled</small><strong>{enrolledCount}</strong></div>
        </div>

        <section className="users-panel">
          <div className="users-toolbar">
            <div className="search-field"><Icon name="search" /><input aria-label="Search users" placeholder="Search by name, email or department" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <select aria-label="Filter by role" value={role} onChange={(event) => setRole(event.target.value as typeof role)}>
              <option>All roles</option><option>Administrator</option><option>Operator</option><option>Viewer</option>
            </select>
          </div>
          <div className="users-table-wrap">
            <table className="users-table">
              <thead><tr><th>User</th><th>Role</th><th>Department</th><th>Biometric</th><th>Status</th><th>Last access</th><th aria-label="Actions" /></tr></thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td><div className="user-cell"><span className="user-avatar">{initials(user.name)}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div></td>
                    <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                    <td>{user.department}</td>
                    <td><span className={`biometric-status ${user.biometric.toLowerCase()}`}><i />{user.biometric}</span></td>
                    <td><button className={`status-toggle ${user.status.toLowerCase()}`} onClick={() => toggleStatus(user.id)}>{user.status}</button></td>
                    <td className="last-access">{user.lastAccess}</td>
                    <td><div className="row-actions"><button aria-label={`Edit ${user.name}`} onClick={() => setEditing(user)}><Icon name="edit" /></button><button aria-label={`Remove ${user.name}`} onClick={() => removeUser(user.id)}><Icon name="trash" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredUsers.length && <div className="empty-users">No users match your search.</div>}
          </div>
        </section>
      </section>
      {formUser && <div className="modal-backdrop" onMouseDown={() => { setEditing(null); setIsAdding(false); }}><section className="user-modal" role="dialog" aria-modal="true" aria-labelledby="user-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header"><div><span className="eyebrow">{editing ? "EDIT USER" : "NEW USER"}</span><h2 id="user-modal-title">{editing ? "Edit user" : "Add user"}</h2></div><button className="modal-close" onClick={() => { setEditing(null); setIsAdding(false); }}>×</button></div>
        <form onSubmit={submitUser}>
          <label>Full name<input name="name" required defaultValue={formUser.name} /></label>
          <label>Email address<input name="email" type="email" required defaultValue={formUser.email} /></label>
          <div className="form-grid"><label>Department<input name="department" required defaultValue={formUser.department} /></label><label>Role<select name="role" defaultValue={formUser.role}><option>Administrator</option><option>Operator</option><option>Viewer</option></select></label></div>
          <div className="form-grid"><label>Biometric status<select name="biometric" defaultValue={formUser.biometric}><option>Pending</option><option>Enrolled</option></select></label><label>Account status<select name="status" defaultValue={formUser.status}><option>Active</option><option>Inactive</option></select></label></div>
          <div className="modal-actions"><button type="button" className="secondary-action" onClick={() => { setEditing(null); setIsAdding(false); }}>Cancel</button><button className="primary-action" type="submit">{editing ? "Save changes" : "Add user"}</button></div>
        </form>
      </section></div>}
    </main>
  );
}
