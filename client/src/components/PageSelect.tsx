import { useAppContext } from "./AppContext"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function PageSelect() {
    const { pageIndex, setPageIndex, users } = useAppContext();

    const bottom: number = pageIndex * 10;
    const top: number = Math.min(users.length, pageIndex * 10 + 10);
    const numOfPages: number = Math.floor(users.length / 10);

    const handleChangePageIndex = (delta: number) => {
        if (delta < 0) {
            setPageIndex((pageIndex: number) => Math.max(0, pageIndex - 1));
        } else {
            setPageIndex((pageIndex: number) => Math.min(pageIndex + 1, numOfPages))
        }
    }

    return (
        <section className="relative z-2 w-4xl mt-6 flex justify-end items-center space-x-6">
            {/** Items Counter */} 
            <p>{bottom + 1}-{top} of {users.length}</p>

            {/** Page Flicker */}
            <div className="flex justify-center items-center space-x-4">
                <FaAngleLeft className={`text-2xl 
                    ${pageIndex == 0 ? "text-slate-400" : 
                    "text-black cursor-pointer"}`} 
                    onClick={() => handleChangePageIndex(-1)}/>
                <p>{pageIndex + 1} / {numOfPages + 1}</p>
                <FaAngleRight className={`text-2xl 
                    ${pageIndex == numOfPages ? "text-slate-400" : 
                    "text-black cursor-pointer"}`}
                    onClick={() => handleChangePageIndex(1)}/>
            </div>
        </section>
    )
}