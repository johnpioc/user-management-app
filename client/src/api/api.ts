import { User, Response, Filter } from "../types";
import axios from "axios";

// Backend API URL
const URL: string = "http://localhost:3001/user";

/**
 * Helper function that unpacks an error encountered in a try and catch block and returns a 
 * Response object with the appropriate error code
 * 
 * @param error the error object that occured during the try and catch block
 * @param returnValue 
 * @returns 
 */
const handleError = <T>(error: any, returnValue: T): Response<T> => {
    let message: string = "";
    if (axios.isAxiosError(error)) {
        if (error.response) {
            message = error.response.data.message;
        } else {
            message = error.message;
        }
    } else {
        message = "An unexpected error occured";
    }

    return { data: returnValue, errorMsg: message };
}
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
        return handleError<User[]>(e, []);
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
        return handleError<number>(e, 0);
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
        return handleError<User[]>(e, []); 
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
        return handleError<User[]>(e, []);
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
        return handleError<User[]>(e, []);
    }
}