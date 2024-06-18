import axios from "axios";
import {accessToken, baseURL} from "../constants/urls";
import {IMoviesAxiosResponse} from "../interfaces/IMoviesAxiosResponse";
import {IGenresResponse} from "../interfaces/IGenresResponse";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {"Content-Type": "application/json"}
});

axiosInstance.interceptors.request.use(req => {
    req.headers.Authorization = `Bearer ${accessToken}`
    return req
})

//===========================================================================================================

const moviesApiService = {

    getAllMovies: async (page: string): Promise<IMoviesAxiosResponse> => {
        const response = await axiosInstance.get<IMoviesAxiosResponse>(`${baseURL}/discover/movie`, {params: {page}});
        return response.data
    },
    getGenres: async (): Promise<IGenresResponse> => {
        const response = await axiosInstance.get<IGenresResponse>(`${baseURL}/genre/movie/list`);
        return response.data;
    }
}

export {moviesApiService}