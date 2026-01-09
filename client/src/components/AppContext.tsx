import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import { Mode, User, Filter } from "../types";
import { getEmptyFilter } from "../helpers";

const AppContext = createContext(null);

/** Helper function that helps components access the context */
export const useAppContext = () => useContext(AppContext);

type ContextTypes = {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

/** Component wrapper that provides it context functionality */
export function AppProvider({ children }) {
  /** Mode for the side tab: Edit, Add or View User */
  const [mode, setMode] = useState<Mode>("VIEW");

  /** List of users to display on screen */
  const [users, setUsers] = useState<User[]>([]);

  /** The user object to be added, edited or viewed */
  const [user, setUser] = useState<User>({
    name: "",
    role: "Software Engineer",
    status: "ACTIVE",
    email: "",
    deleted_at: "",
  });

  /** An object of filters that is passed to the server for data filtering */
  const [filter, setFilter] = useState<Filter>(getEmptyFilter());

  const context: ContextTypes = {
    mode,
    setMode,
    users,
    setUsers,
    user,
    setUser,
    filter,
    setFilter,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
