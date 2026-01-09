import { User, Response, Filter } from "../types";
import axios from "axios";

// Backend API URL
const URL: string = "http://localhost:3001/user";

/**
 * Retrieves a list of users that satisfy a given filter
 * 
 * @param filter an object that specifies the filter parameters
 * @returns a Response object that contains a list of users
 */
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

/**
 * Retrieves the total user count in the database that satisfy a given filter
 * 
 * @param filter an object that specifies the filter parameters
 * @returns a Response object that contains the total user count
 */
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

/**
 * Creates a new user and retrieves an updated list of users that satisfy a given filter
 * 
 * @param newUser a User object that specifies a new user
 * @param filter an object that specifies the filter parameters
 * @returns A Response object that contains the updated list of users
 */
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

/**
 * Updates a current user and retrieves an updated list of users that satisfy a given filter
 * 
 * @param updatedUser a User object that specifies a current user that's been updated
 * @param filter an object that specifies the filter parameters
 * @returns a Response object that contains the updated list of users
 */
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

/**
 * Deletes a current user and retrieves an updated list of users that satisfy a given filter
 * 
 * @param id the id corresponding to the user to be deleted
 * @param filter an object that specifies the filter parameters
 * @returns a Response object that contains the updated list of users
 */
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