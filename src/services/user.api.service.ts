import axios from "axios";
import {apiKEY, baseURL} from "../constants/urls";
import {IUser} from "../interfaces/IUser";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {"Content-Type": "application/json"},
});

const userService = {
    getUserInfo: async (sessionId: string | null): Promise<IUser> => {
        const response = await axiosInstance.get<IUser>(`${baseURL}/account?api_key=${apiKEY}&session_id=${sessionId}`)
        return response.data
    }
}

export default userService
