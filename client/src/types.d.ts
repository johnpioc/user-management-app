export type Status = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type User = {
    name: string,
    email: string,
    role: string,
    status: Status
};