import axios from "axios";
import {apiKEY, baseURL} from "../constants/urls";
import {IRequestToken} from "../interfaces/IRequestToken";
import {ISessionId} from "../interfaces/ISessionId";


const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {"Content-Type": "application/json"}
});

//===========================================================================================================

const authApiService = {

    getToken: async (): Promise<IRequestToken> => {
        const response
            = await axiosInstance.get<IRequestToken>(`${baseURL}/authentication/token/new?api_key=${apiKEY}`)
        return response.data
    },
    createNewSession: async (requestToken: string): Promise<ISessionId> => {
        const response = await axiosInstance.post(`${baseURL}/authentication/session/new?api_key=${apiKEY}`, {request_token: requestToken})
        return response.data
    }
}

export {authApiService}