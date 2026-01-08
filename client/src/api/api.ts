import { User } from "../types";
import axios from "axios";

const URL: string = "http://localhost:3001/user";

export const getUsers = async (): Promise<User[]> => {
    const res = await axios({
        method: 'GET',
        url: URL
    });
    return res.data;
}

export const createUser = async (newUser: User): Promise<User> => {
    const res = await axios({
        method: 'POST',
        url: URL,
        data: newUser
    });
    return res.data;
}

export const deleteUser = async (id: number): Promise<void> => {
    const res = await axios({
        method: "DELETE",
        url: URL + `/${id}`,
    });
    console.log(res);
}