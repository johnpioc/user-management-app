import { roles, statuses } from "../constants";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { createUser, deleteUser, updateUser } from "../api/api";
import { useAppContext } from "./AppContext";
import { User, Response } from "../types";
import { useState, Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const EPOCH_ISO = "1970-01-01T00:00:00.000Z";

type UserBarProps = {
    userBarOpen: boolean;
    setUserBarOpen: Dispatch<SetStateAction<boolean>>;
}

/** Side tab that lets the user add, edit, view or delete a user */
export default function UserBar({ userBarOpen, setUserBarOpen } : UserBarProps) {
    const { setUser, setMode, user, mode, setUsers, filter } = useAppContext();

    /** Current error message to be displayed on screen */
    const [errorMsg, setErrorMsg] = useState<string>("");

    /** Helper function that edits the current user in focus */
    const handleSetUserState = (key: string, value: any): void => {
        setUser((user: User) => {
            return { ...user, [key]: value};
        })
    };

    /** Helper function that adds a user and performs error handling */
    const handleAddUser = async (): Promise<void> => {
        // Return if form constraints are violated
        if (!validateForm()) return;

        // Send a post request to add a new user and retrieve updated list of users
        const res: Response<User[]> = await createUser({
            name: user.name,
            status: user.status,
            role: user.role,
            email: user.email,
            deleted_at: EPOCH_ISO
        }, filter);

        // Display error message if post request fails
        if (res.errorMsg != "") {
            setErrorMsg(res.errorMsg);
            return;
        }

        setErrorMsg("");
        setUsers(res.data);

        setUserBarOpen(false);
        toast(`${user.name} has been added successfully`);
    }

    /** Helper function that updates a current user and performs error handling */
    const handleUpdateUser = async (): Promise<void> => {
        // Return if form constraints are violated
        if (!validateForm()) return;

        // Send a patch request to add a new user and retrieve updated list of users
        const res: Response<User[]> = await updateUser(user, filter);

        // Display error message if patch request fails
        if (res.errorMsg != "") {
            setErrorMsg(res.errorMsg);
            return;
        }

        setUsers(res.data);
        setUserBarOpen(false);
        toast(`${user.name} has been updated successfully!`);
    }

    /** Helper function that deletes a current user and performs error handling */
    const handleDeleteUser = async (id: number): Promise<void> => {
        // Sends a delete request to (soft) delete a user and retrieves an updated list of users
        const res: Response<User[]> = await deleteUser(id, filter);

        // Displays error message if delete request fails
        if (res.errorMsg != "") {
            setErrorMsg(res.errorMsg);
            return;
        }

        // Update list of users, close the user bar and notify the user that deletion is successful
        setUsers(res.data);
        setUserBarOpen(false); 
        toast("User deleted successfully");
    }

    /** 
     * Helper function that validates the user form and returns true if form satisfies constraints,
     * false other
     */
    const validateForm = (): boolean => {
        // Check that name has a [2,100] characters
        if (user.name.length < 2 || user.name.length > 100) {
            setErrorMsg("Name must be between 2 and 100 characters");
            return false;
        };

        // Check that email is a valid format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(user.email)) {
            setErrorMsg("Email must be a valid format");
            return false;
        };

        return true;
    }

    return (
        <section className={`h-screen w-screen transition-all ease-in-out duration-400 fixed
            top-0 left-0
            ${userBarOpen ? 'bg-[rgba(0,0,0,0.4)] z-3' : 'bg-none z-1'}`}>
                <div className={`w-full 
                    lg:w-xl h-full transition-all ease-in-out duration-400 absolute 
                    z-4 ${userBarOpen ? "bottom-0 lg:right-0" : 
                        "right-0 lg:-right-152 lg:bottom-0 -bottom-[80vh]"} 
                        flex flex-col lg:flex-row justify-end items-center`}>
                    {/* EXIT BUTTON */}
                    <div className="h-8 lg:h-full w-64 lg:w-8 flex justify-center   
                        items-center">
                            <button className={`bg-sky-600 w-full h-full lg:h-40 text-white 
                                text-4xl flex justify-center items-center
                                rounded-tl-xl rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl 
                                cursor-pointer`} 
                                onClick={() => { setErrorMsg(""); setUserBarOpen(false) }}>
                                <FaAngleRight className="hidden lg:block" />
                                <FaAngleDown className="block lg:hidden" />
                            </button>
                    </div>

                    <div className="flex flex-col justify-start items-start text-black bg-white
                        h-[70vh] lg:h-full w-full lg:w-xl p-4 text-lg">
                            {/* TITLE */}
                            <h2 className="text-2xl text-sky-600 font-bold">
                                {mode} USER
                            </h2>

                            {/* NAME */}
                            <label className="font-bold mt-8" htmlFor="name">Name</label>
                            {mode == "VIEW" ? 
                            (
                                <p>{user.name}</p>
                            ) : (
                                <input className="w-full rounded-md border-slate-300 border-2 p-1 
                                    mt-1" type="text" id="name" value={user.name}
                                    onChange={e => handleSetUserState("name", e.target.value)} />
                            )}

                            {/* ROLE */}
                            <label className="font-bold mt-4" htmlFor="role">Role</label>
                            {mode == "VIEW" ? 
                            (
                                <p>{user.role}</p>
                            ) : (
                                <select className="w-full rounded-md border-slate-300 border-2 p-1 
                                    mt-1" name="role" id="role" value={user.role}
                                    onChange={e => handleSetUserState("role", e.target.value)}>
                                        {roles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                </select>
                            )}

                            {/* EMAIL */}
                            <label className="font-bold mt-4" htmlFor="email">Email</label>
                            {mode == "VIEW" ? (
                                <p>{user.email}</p>
                            ) : (
                                <input className="w-full rounded-md border-slate-300 border-2 p-1 
                                    mt-1" type="email" id="email" value={user.email}
                                    onChange={e => handleSetUserState("email", e.target.value)}/>
                            )}                            
                            

                            {/* STATUS */}
                            <label className="font-bold mt-4" htmlFor="status">Status</label>
                            {mode == "VIEW" ? (
                                <p>{user.status}</p>
                            ) : (
                                <select className="w-full rounded-md border-slate-300 border-2 p-1 
                                    mt-1" name="status" id="status" value={user.status}
                                    onChange={e => handleSetUserState("status", e.target.value)}>
                                        {statuses.map(status => (
                                            <option value={status}>{status}</option>
                                        ))}
                                </select>
                            )}

                            {/** ERROR MESSAGE */}
                            <p className="mt-8 text-red-500 text-center w-full">{errorMsg}</p>

                            {/* ACTIONS */}
                            <div className="flex justify-center items-center w-full space-x-4 mt-8">
                                {/* SUBMIT/SAVE BUTTON */}
                                {mode != "VIEW" && (
                                    <button className="bg-sky-600 rounded-md px-8 py-2
                                        text-white font-bold cursor-pointer"
                                        onClick={mode == "EDIT" ? () => handleUpdateUser() : 
                                            () => handleAddUser()}>
                                        {mode == "EDIT" ? "SAVE" : "SUBMIT"}
                                    </button>
                                )}

                                {/* EDIT BUTTON */}
                                {mode == "VIEW" && (
                                    <button className="bg-sky-600 rounded-md px-8 py-2 
                                        text-white font-bold cursor-pointer"
                                        onClick={() => setMode("EDIT")}>
                                        Edit User
                                    </button>
                                )}

                                {/* DELETE BUTTON */}
                                {mode == "VIEW" && (
                                    <button className="bg-red-500 rounded-md px-8 py-2 
                                        text-white font-bold cursor-pointer"
                                        onClick={() => handleDeleteUser(user.id)}>
                                        Delete User
                                    </button>
                                )}
                            </div>
                            
                    </div>
                </div>
        </section>
    );
}