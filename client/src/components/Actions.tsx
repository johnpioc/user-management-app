import { useState } from 'react';
import { FaPlus } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoFilter } from "react-icons/io5";
import { useAppContext } from './AppContext';

export default function Actions() {
    const { setOpen, setMode, setUser } = useAppContext();
    const [searchText, setSearchText] = useState<string>("");

    const handleClickAddUser = () => {
        setOpen(true);
        setMode("ADD");
        setUser({
            name: "",
            role: "Software Engineer",
            status: "ACTIVE",
            email: "",
            deleted_at: ""
        })
    };

    return (
        <section className="w-4xl flex justify-between items-center text-lg mb-4">
            <div className="flex items-center justify-center space-x-4">
                {/* SEARCH BAR */}
                <div className="w-96 rounded-full flex space-x-2 items-center border-2 bg-white
                    border-slate-400 p-2 shadow-xl relative z-2">
                        <FaMagnifyingGlass className="text-slate-400"/>
                        <input type="text" className="w-full focus:outline-none focus:ring-0" 
                        placeholder="Search for a user..." 
                        value={searchText} onChange={e => setSearchText(e.target.value)}/>
                </div>

                {/* FILTER BUTTON */}
                <button className="p-2 bg-white shadow-xl rounded-full border-2 
                    border-slate-400 cursor-pointer relative z-2">
                    <IoFilter className="text-3xl" />
                </button>
            </div>
            {/* ADD USER BUTTON */}
            <button className="rounded-full flex justify-center items-center space-x-2 bg-sky-600
                text-white px-4 py-1 cursor-pointer relative z-2 shadow-xl" 
                onClick={() => handleClickAddUser()}>
                <FaPlus />
                <p>Add User</p>
            </button>
        </section>
    );
}