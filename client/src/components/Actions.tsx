import { SetStateAction, Dispatch } from 'react';
import { FaPlus } from 'react-icons/fa'
import { Mode } from '../types';

type ActionsProps = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setMode: Dispatch<SetStateAction<Mode>>;
};

export default function Actions({ setOpen, setMode }: ActionsProps) {
    const handleClickAddUser = () => {
        setOpen(true);
        setMode("ADD");
    };

    return (
        <section className="w-4xl flex justify-end items-center text-lg mb-4">
            <button className="rounded-full flex justify-center items-center space-x-2 bg-sky-600
                text-white px-4 py-1 cursor-pointer relative z-2" 
                onClick={() => handleClickAddUser()}>
                <FaPlus />
                <p>Add User</p>
            </button>
        </section>
    );
}