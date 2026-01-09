import { User, Response, Filter } from "../types";
import axios from "axios";

const URL: string = "http://localhost:3001/user";

export const getUsers = async (filter: Filter): Promise<Response<User[]>> => {
    try {
        const res = await axios({
            method: 'POST',
            url: URL,
            data: filter
        });

        return { errorMsg: "", data: res.data };
    } catch (e) {
        return { errorMsg: "Unable to process users, please try again later", data: [] };
    }
}

export const getTotalUserCount = async(filter: Filter): Promise<Response<number>> => {
    try {
        const res = await axios({
            method: "POST",
            url: URL + "/count",
            data: filter
        });

        return { errorMsg: "", data: res.data };
    } catch (e) {
        return { errorMsg: "Unable to get user count, please try again later", data: 0 };
    }
}

export const createUser = async (newUser: User, filter: Filter): Promise<Response<User[]>> => {
    try {
        await axios({
            method: 'POST',
            url: URL + "/create",
            data: newUser
        });
        
        return getUsers(filter);
    } catch (e) {
        return { 
            errorMsg: "Unable to add user, please make sure email is unique", 
            data: []
        };
    }
    
}

export const updateUser = async (updatedUser: User, filter: Filter): Promise<Response<User[]>> => {
    try {
        await axios({
            method: 'PATCH',
            url: URL + `/${updatedUser.id}`, 
            data: updatedUser
        });

        return getUsers(filter);

    } catch (e) {
        return { 
            errorMsg: "Unable to update user, please make sure email is unique",
            data: []
        };
    }
}

export const deleteUser = async (id: number, filter: Filter): Promise<Response<User[]>> => {
    try {
        await axios({
            method: "DELETE",
            url: URL + `/${id}`,
        });

        return getUsers(filter);

    } catch (e) {
        return {
            errorMsg: "Failed to delete user, please try again later",
            data: []
        }
    }
}