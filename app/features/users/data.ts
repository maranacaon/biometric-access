import { User } from "./types";

export const initialUsers: User[] = [
  { id: "usr-001", name: "Marina Almeida", email: "marina.almeida@acme.com", role: "Administrator", department: "Operations", biometric: "Enrolled", status: "Active", lastAccess: "Today, 14:32" },
  { id: "usr-002", name: "Rafael Nunes", email: "rafael.nunes@acme.com", role: "Operator", department: "Security", biometric: "Enrolled", status: "Active", lastAccess: "Today, 14:29" },
  { id: "usr-003", name: "Camila Torres", email: "camila.torres@acme.com", role: "Operator", department: "Human resources", biometric: "Enrolled", status: "Active", lastAccess: "Today, 13:58" },
  { id: "usr-004", name: "Lucas Martins", email: "lucas.martins@acme.com", role: "Viewer", department: "Finance", biometric: "Pending", status: "Inactive", lastAccess: "Yesterday, 17:41" },
  { id: "usr-005", name: "Sofia Costa", email: "sofia.costa@acme.com", role: "Viewer", department: "Operations", biometric: "Enrolled", status: "Active", lastAccess: "Yesterday, 16:20" },
];
