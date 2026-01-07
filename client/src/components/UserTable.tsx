import { Mode, User } from "../types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

const userData: User[] = [
    {
        name: "John",
        email: "john@email.com",
        role: "Software Engineer",
        status: "ACTIVE"
    },
    {
        name: "Annie",
        email: "annie@email.com",
        role: "Product Owner",
        status: "INACTIVE"
    },
    {
        name: "Kana",
        email: "kana@email.com",
        role: "Project Manager",
        status: "SUSPENDED"
    },
    {
        name: "Gina",
        email: "gina@email.com",
        role: "Scrum Master",
        status: "ACTIVE"
    }
]

type UserTableProps = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setMode: Dispatch<SetStateAction<Mode>>;
    setUser: Dispatch<SetStateAction<User>>;
};

export default function UserTable({ setOpen, setMode, setUser }: UserTableProps) {
    const [users, setUsers] = useState<User[]>([]);

    const handleSelectUser = (user: User): void => {
        setOpen(true);
        setMode("VIEW");
        setUser(user)
    }

    useEffect(() => {
        const fetchUsers = () => {
            setUsers(userData);
        }

        fetchUsers();
    }, []);

    return (
        <section className="w-4xl rounded-lg overflow-hidden shadow-xl bg-white relative z-2">
                {/* TABLE HEADERS */}
                <div className="grid grid-cols-4 text-white font-bold text-lg
                    bg-sky-600 p-2">
                    <p>Name</p>
                    <p>Role</p>
                    <p>Email</p>
                    <p>Status</p>
                </div>

                {/* USERS */}
                {users.map((user, index) => (
                    <div className={`grid grid-cols-4 text-black text-md p-2
                        ${index % 2 == 1 ? 'bg-slate-100' : 'bg-white-200'} cursor-pointer`}
                        onClick={() => handleSelectUser(user)}>
                        <p>{user.name}</p>
                        <p>{user.role}</p>
                        <p>{user.email}</p>
                        <p>{user.status}</p>
                    </div>
                ))}
        </section>
    );
}