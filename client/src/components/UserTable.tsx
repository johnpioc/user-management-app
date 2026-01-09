import { getUsers } from "../api/api";
import { User, Response } from "../types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAppContext } from "./AppContext";

type UserTableProps = {
    setUserBarOpen: Dispatch<SetStateAction<boolean>>;
}

/** Displays table of users with respect to page limit and current page number */
export default function UserTable({ setUserBarOpen }: UserTableProps) {
    const { setMode, setUser, users, setUsers, filter } = useAppContext();

    /** Helper function that opens the user bar based on the user selected */
    const handleSelectUser = (user: User): void => {
        setUserBarOpen(true);
        setMode("VIEW");
        setUser(user)
    }

    /** Fetches users based on the current filter, re-runs everytime filter is changed */
    useEffect(() => {
        const fetchUsers = async (): Promise<void> => {
            const res: Response<User[]> = await getUsers(filter);
            setUsers(res.data);
        }

        fetchUsers();
    }, [filter]);

    return (
        <section className="w-full lg:w-4xl rounded-lg overflow-hidden shadow-xl 
            bg-white relative z-2">
                {/* TABLE HEADERS */}
                <div className="grid lg:grid-cols-4 grid-cols-2 text-white font-bold text-lg
                    bg-sky-600 p-2">
                    <p>Name</p>
                    <p>Role</p>
                    <p className="lg:block hidden">Email</p>
                    <p className="lg:block hidden">Status</p>
                </div>

                {/* USERS */}
                {users.map((user, index) => (
                    <div key={index} className={`grid lg:grid-cols-4 grid-cols-2 
                        text-black text-md p-2
                        ${index % 2 == 1 ? 'bg-slate-100' : 'bg-white-200'} cursor-pointer`}
                        onClick={() => handleSelectUser(user)}>
                        <p>{user.name}</p>
                        <p>{user.role}</p>
                        <p className="lg:block hidden">{user.email}</p>
                        <p className="lg:block hidden">{user.status}</p>
                    </div>
                ))}
        </section>
    );
}