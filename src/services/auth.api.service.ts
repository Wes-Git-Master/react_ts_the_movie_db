import axios from "axios";
import {apiKEY, baseURL} from "../constants/urls";
import {IAuth} from "../interfaces/IAuth";


const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {"Content-Type": "application/json"}
});

//===========================================================================================================

const authApiService = {

    getToken: async (): Promise<IAuth> => {
        const response
            = await axiosInstance.get<IAuth>(`${baseURL}/authentication/token/new?api_key=${apiKEY}`);
        return response.data
    },
    createNewSession: async (requestToken: string): Promise<IAuth> => {
        const response = await axiosInstance.post(`${baseURL}/authentication/session/new?api_key=${apiKEY}`, {request_token: requestToken})
        return response.data
    }
}


export {authApiService}