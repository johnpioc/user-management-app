import { Role, Status } from "../types";

export type User = {
  id?: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  created_at?: string;
  updated_at?: string;
  deleted_at: string;
};
