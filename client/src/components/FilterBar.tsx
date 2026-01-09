import { Dispatch, SetStateAction, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useAppContext } from "./AppContext";
import { Filter } from "../types";
import { getEmptyFilter, statuses } from "../constants";

type FilterBarProps = {
    filterBarOpen: boolean;
    setFilterBarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function FilterBar({ filterBarOpen, setFilterBarOpen }: FilterBarProps) {
    const { filter, setFilter } = useAppContext();
    const [newFilter, setNewFilter] = useState<Filter>(filter);
    console.log(newFilter);

    const handleSaveFilter = (): void => {
        setFilter(newFilter);
        setFilterBarOpen(false);
    }

    const handleResetFilter = (): void => {
        setFilter(getEmptyFilter());
        setNewFilter(getEmptyFilter());
    }

    return (
        <section className={`h-screen w-screen transition-all ease-in-out duration-400 absolute
            top-0 left-0
            ${filterBarOpen ? 'bg-[rgba(0,0,0,0.4)] z-3' : 'bg-none z-1'}`}>
                <div className={`w-xl h-screen transition-all ease-in-out duration-400 absolute 
                    z-4 top-0 ${filterBarOpen ? "right-0" : "-right-152"} flex`}>
                    {/* EXIT BUTTON */}
                    <div className="h-full w-8 flex justify-center items-center">
                        <button className={`bg-sky-600 w-full h-40 text-white text-4xl 
                            rounded-tl-xl rounded-bl-xl cursor-pointer`} 
                            onClick={() => setFilterBarOpen(false) }>
                            <FaAngleRight />
                        </button>
                    </div>

                    <div className="flex flex-col justify-start items-start text-black bg-white
                        h-full w-xl p-4 text-lg">
                        {/* TITLE */}
                        <h2 className="text-2xl text-sky-600 font-bold">
                            ADJUST FILTERS
                        </h2>

                        {/* USER LIMIT SLIDER */}
                        <label htmlFor="user-limit" className="mt-8 font-bold">
                            Number of users displayed per page
                        </label>
                        <div className="flex items-center justify-start space-x-2 w-full mt-4">
                            <p>{newFilter.pageLimit}</p>
                            <input type="range" min={1} max={100} className="w-full" id="user-limit"
                                value={newFilter.pageLimit} 
                                onChange={e => setNewFilter((filter) => {
                                    return { ...filter, pageLimit: parseInt(e.target.value) }
                                })} />
                        </div>

                        {/* DATE RANGE */}
                        <label htmlFor="date-range" className="mt-8 font-bold">
                            Users Created During
                        </label>
                        <div className="flex items-center justify-center w-full space-x-4 mt-4">
                            <input type="date" 
                                className="border-2 border-slate-400 rounded-md p-1 w-full" 
                                onClick={(e) => setNewFilter(filter => {
                                    return { 
                                        ...filter, 
                                        startDate: e.target.value
                                    }
                                })}
                                value={newFilter.startDate}
                                />
                            <p>To</p>
                            <input type="date"
                                className="border-2 border-slate-400 rounded-md p-1 w-full"
                                onClick={(e) => setNewFilter(filter => {
                                    return { 
                                        ...filter, 
                                        endDate: e.target.value
                                    }
                                })}
                                value={newFilter.endDate}
                                />
                        </div>

                        {/* STATUS */}
                        <label htmlFor="status" className="mt-8 font-bold">
                            Has Status
                        </label>
                        <div className="flex items-center justify-center mt-4 space-x-4 w-full">
                            {statuses.map(status => (
                                <button className={`w-full border-2 border-slate-400 rounded-md
                                    cursor-pointer ${newFilter.status == status && 
                                        "bg-sky-600 text-white font-bold shadow-xl"
                                    }`} 
                                    onClick={() => setNewFilter(filter => { return {...filter,
                                        status: status != filter.status ? status : "NONE",
                                    }})}
                                    >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-center items-center w-full space-x-4 mt-8">
                            {/* RESET FILTER */}
                            <button className="bg-slate-500 rounded-md px-8 py-2 text-white font-bold cursor-pointer" onClick={() => handleResetFilter()}>
                                RESET FILTERS
                            </button>

                            {/* SUBMIT/SAVE BUTTON */}
                            <button className="bg-sky-600 rounded-md px-8 py-2
                                text-white font-bold cursor-pointer"
                                onClick={() => handleSaveFilter()}>
                                SAVE FILTERS
                            </button>
                        </div>
                    </div>
                </div>
        </section>
    );
}