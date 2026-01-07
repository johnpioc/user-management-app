import { roles, statuses } from "./constants";

export type Mode = "ADD" | "EDIT" | "VIEW";

export type Role = typeof roles[string];
export type Status = typeof status[string];

export type User = {
    name: string,
    email: string,
    role: Role,
    status: Status
};