import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getTotalUserCount } from "../api/api";
import { Response, Filter } from "../types";

/** Provides an interface for the user to select the page number to support user list pagination */
export default function PageSelect() {
  const { users, filter, setFilter } = useAppContext();

  /** The number of total users that satisfy the given filter */
  const [userCount, setUserCount] = useState<number>(0);

  /** The starting number of users displayed currently on screen */
  const bottom: number = (filter.pageNumber - 1) * filter.pageLimit;

  /** The upper bound number of users displayed current on screen */
  const top: number = Math.min(userCount, bottom + filter.pageLimit);

  /** The total number of pages with respect to the page limit and total user count */
  const numOfPages: number = Math.floor((userCount - 1) / filter.pageLimit) + 1;

  /** Helper function that changes the page index and ensures that it stays within bounds */
  const handleChangePageIndex = (delta: number) => {
    if (delta < 0) {
      setFilter((filter: Filter) => {
        return {
          ...filter,
          pageNumber: Math.max(0, filter.pageNumber + delta),
        };
      });
    } else {
      setFilter((filter: Filter) => {
        return {
          ...filter,
          pageNumber: Math.min(numOfPages, filter.pageNumber + delta),
        };
      });
    }
  };

  useEffect(() => {
    /** Fetches the user count that satisfy a given filter */
    const fetchUserCount = async (): Promise<void> => {
      const res: Response<number> = await getTotalUserCount(filter);
      setUserCount(res.data);
    };

    fetchUserCount();
  }, [users]);

  return (
    <section
      className="relative z-2 w-full lg:w-4xl mt-6 flex justify-end 
            items-center space-x-6"
    >
      {/** Items Counter */}
      <p>
        {bottom + 1}-{top} of {userCount}
      </p>

      {/** Page Flicker */}
      <div className="flex justify-center items-center space-x-4">
        <FaAngleLeft
          className={`text-2xl 
                    ${
                      filter.pageNumber == 1
                        ? "text-slate-400"
                        : "text-black cursor-pointer"
                    }`}
          onClick={() => handleChangePageIndex(-1)}
        />
        <p>
          {filter.pageNumber} / {numOfPages}
        </p>
        <FaAngleRight
          className={`text-2xl 
                    ${
                      filter.pageNumber == numOfPages
                        ? "text-slate-400"
                        : "text-black cursor-pointer"
                    }`}
          onClick={() => handleChangePageIndex(1)}
        />
      </div>
    </section>
  );
}
