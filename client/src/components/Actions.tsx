import { Dispatch, SetStateAction, useState } from 'react';
import { FaPlus } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoFilter } from "react-icons/io5";
import { useAppContext } from './AppContext';
import { Filter } from '../types';

/**
 * Helper function that checks whether a given filter object matches the default filter
 * @param filter filter object to check
 * @returns true if given filter matches default settings, false otherwise
 */
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

type ActionsProps = {
    setUserBarOpen: Dispatch<SetStateAction<boolean>>;
    setFilterBarOpen: Dispatch<SetStateAction<boolean>>;
}

/** Provides different actions for the user to initiate: search, filter and add user */
export default function Actions({ setUserBarOpen, setFilterBarOpen }: ActionsProps) {
    const { setMode, setUser, filter, setFilter } = useAppContext();

    /** Stores the text typed into the search bar */
    const [searchText, setSearchText] = useState<string>("");

    /** Helper function that opens a side tab to add a new user */
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

    /** 
     * Helper function that saves the text in the search bar as a filter that only retrieves 
     * names that contain the given text
     */
    const handlePressEnter = (e) => {
        if (e.key == "Enter") {
            setFilter(filter => {
                return { ...filter, nameContainsChars: searchText, pageNumber: 1 }
            });
        }
    }

    return (
        <section className="w-full lg:w-4xl flex flex-col lg:flex-row space-y-4 lg:space-y-0
            justify-between items-center text-lg mb-4">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4 
                space-y-4 lg:space-y-0 w-full lg:justify-start">
                {/* SEARCH BAR */}
                <div className="w-full lg:w-96 rounded-full flex space-x-2 
                    items-center border-2 bg-white text
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
                <button className={`lg:p-2 p-0 shadow-xl rounded-full border-2 flex justify-center 
                    items-center space-x-4 lg:space-x-0
                    border-slate-400 cursor-pointer relative z-2 w-full lg:w-auto
                    ${!isEmptyFilter(filter) ? "bg-sky-600 text-white" : "bg-white"}`}
                    onClick={() => setFilterBarOpen(true)}>
                    <IoFilter className="text-xl lg:text-3xl" />
                    <p className="lg:hidden block text-xl">Filters</p>
                </button>
            </div>

            {/* ADD USER BUTTON */}
            <button className="rounded-full flex justify-center items-center space-x-2
                bg-sky-600 lg:space-x-2
                text-white px-4 py-1 cursor-pointer relative z-2 shadow-xl lg:w-auto w-full" 
                onClick={() => handleClickAddUser()}>
                <FaPlus />
                <p className="w-[8ch]">Add User</p>
            </button>
        </section>
    );
}