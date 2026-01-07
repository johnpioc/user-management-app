import { useState } from "react";

import UserTable from "./components/UserTable";
import Actions from "./components/Actions";
import UserBar from "./components/UserBar";
import { Mode, User } from "./types";

export default function App() {
    const [open, setOpen] = useState<boolean>(true);
    const [mode, setMode] = useState<Mode>("ADD");
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        role: "",
        status: "ACTIVE"
    });

    return (
        <div className="bg-slate-100 h-screen w-screen flex flex-col justify-center items-center
            overflow-hidden">
            <Actions setOpen={setOpen} setMode={setMode}/>
            <UserTable setOpen={setOpen} setMode={setMode} setUser={setUser}/>
            <UserBar open={open} setOpen={setOpen} mode={mode} user={user} setUser={setUser} />
        </div>
    );
}