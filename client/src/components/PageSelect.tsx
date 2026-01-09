import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getTotalUserCount } from "../api/api";
import { Response, Filter } from "../types";

export default function PageSelect() {
    const { users, filter, setFilter } = useAppContext();
    const [userCount, setUserCount] = useState<number>(0);

    const bottom: number = (filter.pageNumber - 1) * filter.pageLimit;
    const top: number = Math.min(userCount, bottom + filter.pageLimit);
    const numOfPages: number = Math.floor((userCount - 1) / filter.pageLimit) + 1;

    const handleChangePageIndex = (delta: number) => {
        if (delta < 0) {
            setFilter((filter: Filter) => {
                return {
                    ...filter,
                    pageNumber: Math.max(0, filter.pageNumber + delta)
                }
            })
        } else {
            setFilter((filter: Filter) => {
                return {
                    ...filter,
                    pageNumber: Math.min(numOfPages, filter.pageNumber + delta)
                }
            })
        }
    }

    useEffect(() => {
        const fetchUserCount = async (): Promise<void> => {
            const res: Response<number> = await getTotalUserCount(filter);
            setUserCount(res.data);
        }

        fetchUserCount();
    }, [users])

    return (
        <section className="relative z-2 w-4xl mt-6 flex justify-end items-center space-x-6">
            {/** Num of Items picker */}

            {/** Items Counter */} 
            <p>{bottom + 1}-{top} of {userCount}</p>

            {/** Page Flicker */}
            <div className="flex justify-center items-center space-x-4">
                <FaAngleLeft className={`text-2xl 
                    ${filter.pageNumber == 1 ? "text-slate-400" : 
                    "text-black cursor-pointer"}`} 
                    onClick={() => handleChangePageIndex(-1)}/>
                <p>{filter.pageNumber } / {numOfPages }</p>
                <FaAngleRight className={`text-2xl 
                    ${filter.pageNumber == numOfPages ? "text-slate-400" : 
                    "text-black cursor-pointer"}`}
                    onClick={() => handleChangePageIndex(1)}/>
            </div>
        </section>
    )
}