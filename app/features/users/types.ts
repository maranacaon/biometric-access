export type UserRole = "Administrator" | "Operator" | "Viewer";
export type UserStatus = "Active" | "Inactive";
export type BiometricStatus = "Enrolled" | "Pending";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  biometric: BiometricStatus;
  status: UserStatus;
  lastAccess: string;
};

export type UserInput = Omit<User, "id" | "lastAccess">;
