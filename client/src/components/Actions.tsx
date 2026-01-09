import { Dispatch, SetStateAction, useState } from 'react';
import { FaPlus } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoFilter } from "react-icons/io5";
import { useAppContext } from './AppContext';
import { Filter } from '../types';

type ActionsProps = {
    setUserBarOpen: Dispatch<SetStateAction<boolean>>;
    setFilterBarOpen: Dispatch<SetStateAction<boolean>>;
}

const isEmptyFilter = (filter: Filter): boolean => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return filter.startDate == (new Date(0).toISOString().split('T')[0]) 
    && filter.endDate == tomorrow.toISOString().split('T')[0]
    && filter.status == "NONE"
    && filter.pageNumber == 1
    && filter.pageLimit == 10;
}

export default function Actions({ setUserBarOpen, setFilterBarOpen }: ActionsProps) {
    const { setMode, setUser, filter, setFilter } = useAppContext();
    const [searchText, setSearchText] = useState<string>("");

    const handleClickAddUser = () => {
        setUserBarOpen(true);
        setMode("ADD");
        setUser({
            name: "",
            role: "Software Engineer",
            status: "ACTIVE",
            email: "",
            deleted_at: ""
        })
    };

    const handlePressEnter = (e) => {
        if (e.key == "Enter") {
            setFilter(filter => {
                return { ...filter, nameContainsChars: searchText }
            });
        }
    }

    return (
        <section className="w-4xl flex justify-between items-center text-lg mb-4">
            <div className="flex items-center justify-center space-x-4">
                {/* SEARCH BAR */}
                <div className="w-96 rounded-full flex space-x-2 items-center border-2 bg-white
                    border-slate-400 p-2 shadow-xl relative z-2">
                        <FaMagnifyingGlass className="text-slate-400"/>
                        <input type="text" className="w-full focus:outline-none focus:ring-0" 
                        placeholder="Search for a user..." onKeyDown={e => handlePressEnter(e)}
                        value={searchText} onChange={e => setSearchText(e.target.value)}/>
                        <button className={`bg-sky-600 overflow-hidden rounded-md text-sm
                            text-white ${searchText != filter.nameContainsChars ? 'w-20' : 
                            'w-0'} transition-all duration-200 ease-in-out text-center`}>
                                Apply
                        </button>
                </div>

                {/* FILTER BUTTON */}
                <button className={`p-2 shadow-xl rounded-full border-2 
                    border-slate-400 cursor-pointer relative z-2
                    ${!isEmptyFilter(filter) ? "bg-sky-600 text-white" : "bg-white"}`}
                    onClick={() => setFilterBarOpen(true)}>
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