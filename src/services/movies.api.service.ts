import axios from "axios";
import {accessToken, baseURL} from "../constants/urls";
import {IMoviesAxiosResponse} from "../interfaces/IMoviesAxiosResponse";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {"Content-Type": "application/json"}
});

axiosInstance.interceptors.request.use(req => {
    const token = `${accessToken}`

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

const moviesApiService = {

    getAllMovies: async (page:string): Promise<IMoviesAxiosResponse> => {
        const response = await axiosInstance.get<IMoviesAxiosResponse>(`${baseURL}/discover/movie`,{params:{page}});
        return response.data
    }
}

export {moviesApiService}