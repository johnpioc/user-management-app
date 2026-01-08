import { useState, useContext, createContext, Dispatch, SetStateAction } from "react";
import { Mode, User } from "../types";

const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

type ContextTypes = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
    users: User[],
    setUsers: Dispatch<SetStateAction<User[]>>;
    user: User,
    setUser: Dispatch<SetStateAction<User>>;
    pageIndex: number,
    setPageIndex: Dispatch<SetStateAction<number>>;
};

export function AppProvider({ children }) {
    const [open, setOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<Mode>("VIEW");
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        name: "",
        role: "Software Engineer",
        status: "ACTIVE",
        email: "",
        deleted_at: ""
    });
    const [pageIndex, setPageIndex] = useState<number>(0);

    const context: ContextTypes = {
        open,
        setOpen,
        mode,
        setMode,
        users,
        setUsers,
        user,
        setUser,
        pageIndex,
        setPageIndex
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}