import { getUsers } from "../api/api";
import { User } from "../types";
import { useState, useEffect } from "react";
import { useAppContext } from "./AppContext";

export default function UserTable() {
    const { setOpen, setMode, setUser, users, setUsers, pageIndex } = useAppContext();

    const handleSelectUser = (user: User): void => {
        setOpen(true);
        setMode("VIEW");
        setUser(user)
    }
    
    const getPaginatedUsers = (): User[] => {
        const bottom: number = pageIndex * 10;
        const top: number = Math.min(users.length, pageIndex * 10 + 10);
        return users.slice(bottom, top);
    }

    useEffect(() => {
        const fetchUsers = async (): Promise<void> => {
            const usersData: User[] = await getUsers();
            setUsers(usersData);
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
                {getPaginatedUsers().map((user, index) => (
                    <div key={index} className={`grid grid-cols-4 text-black text-md p-2
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