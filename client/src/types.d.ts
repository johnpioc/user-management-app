import { roles, statuses } from "./constants";

export type Mode = "ADD" | "EDIT" | "VIEW";

export type Role = typeof roles[string];
export type Status = typeof statuses[string];

export type User = {
    name: string,
    email: string,
    role: Role,
    status: Status
};