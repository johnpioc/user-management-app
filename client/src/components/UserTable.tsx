import { User } from "../types";
import { useState, useEffect } from "react";

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
        role: "Frontend Engineer",
        status: "INACTIVE"
    },
    {
        name: "Kana",
        email: "kana@email.com",
        role: "Software Engineer",
        status: "SUSPENDED"
    },
    {
        name: "Gina",
        email: "gina@email.com",
        role: "Backend Engineer",
        status: "ACTIVE"
    }
]

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = () => {
            setUsers(userData);
        }

        fetchUsers();
    }, []);

    return (
        <section className="w-4xl rounded-lg overflow-hidden shadow-xl bg-white">
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
                        ${index % 2 == 1 ? 'bg-sky-100' : 'bg-white-200'} cursor-pointer`}>
                        <p>{user.name}</p>
                        <p>{user.status}</p>
                        <p>{user.role}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
        </section>
    );
}