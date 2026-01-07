import { SetStateAction, Dispatch } from "react";
import { Mode, User } from "../types";
import { roles, statuses } from "../constants";
import { FaAngleRight } from "react-icons/fa";

type EditUserProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    mode: Mode;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    setMode: Dispatch<SetStateAction<Mode>>;
};

export default function UserBar({ open, setOpen, mode, user, setUser, setMode } : EditUserProps) {
    const handleSetUserState = (key: string, value: any): void => {
        setUser(user => {
            return { ...user, [key]: value};
        })
    };

    return (
        <section className={`h-screen w-screen transition-all ease-in-out duration-400 absolute
            top-0 left-0
            ${open ? 'bg-[rgba(0,0,0,0.4)] z-3' : 'bg-none z-1'}`}>
                <div className={`w-xl h-screen transition-all ease-in-out duration-400 absolute 
                    z-4 top-0 ${open ? "right-0" : "-right-152"} flex`}>
                    {/* EXIT BUTTON */}
                    <div className="h-full w-8 flex justify-center items-center">
                            <button className={`bg-sky-600 w-full h-40 text-white text-4xl 
                                rounded-tl-xl rounded-bl-xl cursor-pointer`} 
                                onClick={() => setOpen(false)}>
                                <FaAngleRight />
                            </button>
                    </div>

                    <div className="flex flex-col justify-start items-start text-black bg-white
                        h-full w-xl p-4 text-lg">
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
                                    onChange={e => handleSetUserState("name", e.target.value)}>
                                        {roles.map(role => (
                                            <option value={role}>{role}</option>
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
                                    onChange={e => handleSetUserState("name", e.target.value)}/>
                            )}                            
                            

                            {/* STATUS */}
                            <label className="font-bold mt-4" htmlFor="status">Status</label>
                            {mode == "VIEW" ? (
                                <p>{user.status}</p>
                            ) : (
                                <select className="w-full rounded-md border-slate-300 border-2 p-1 
                                    mt-1" name="status" id="status" value={user.status}
                                    onChange={e => handleSetUserState("name", e.target.value)}>
                                        {statuses.map(status => (
                                            <option value={status}>{status}</option>
                                        ))}
                                </select>
                            )}

                            {/* ACTIONS */}
                            <div className="flex justify-center items-center w-full space-x-4 mt-8">
                                {/* SUBMIT/SAVE BUTTON */}
                                {mode != "VIEW" && (
                                    <button className="bg-sky-600 rounded-md px-8 py-2
                                        text-white font-bold cursor-pointer">
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
                                        text-white font-bold cursor-pointer">
                                        Delete User
                                    </button>
                                )}
                            </div>
                            
                    </div>
                </div>
        </section>
    );
}