import { roles, statuses } from "./constants";

export type Mode = "ADD" | "EDIT" | "VIEW";

export type Role = typeof roles[string];
export type Status = typeof statuses[string];

export type User = {
    id?: string,
    name: string,
    email: string,
    role: Role,
    status: Status,
    created_at?: string,
    updated_at?: string,
    deleted_at: string
};