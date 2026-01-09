import { useState, useContext, createContext, Dispatch, SetStateAction } from "react";
import { Mode, User, Filter } from "../types";
import { getEmptyFilter } from "../constants";

const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

type ContextTypes = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
    users: User[],
    setUsers: Dispatch<SetStateAction<User[]>>;
    user: User,
    setUser: Dispatch<SetStateAction<User>>;
    filter: Filter
    setFilter: Dispatch<SetStateAction<Filter>>;
};

export function AppProvider({ children }) {
    const [mode, setMode] = useState<Mode>("VIEW");
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        name: "",
        role: "Software Engineer",
        status: "ACTIVE",
        email: "",
        deleted_at: ""
    });
    const [filter, setFilter] = useState<Filter>(getEmptyFilter());

    const context: ContextTypes = {
        mode,
        setMode,
        users,
        setUsers,
        user,
        setUser,
        filter,
        setFilter
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}