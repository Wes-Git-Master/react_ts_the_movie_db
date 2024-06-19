import axios from "axios";
import {accessToken, baseURL} from "../constants/urls";
import {IMoviesAxiosResponse} from "../interfaces/IMoviesAxiosResponse";
import {IGenresAxiosResponse} from "../interfaces/IGenresAxiosResponse";

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

    getAllMovies: async (page: string,genreId?: string): Promise<IMoviesAxiosResponse> => {
        const response
            = await axiosInstance.get<IMoviesAxiosResponse>(`${baseURL}/discover/movie`, {params: {page,with_genres: genreId}});
        return response.data
    },
    getGenres: async (): Promise<IGenresAxiosResponse> => {
        const response
            = await axiosInstance.get<IGenresAxiosResponse>(`${baseURL}/genre/movie/list`);
        return response.data;
    }
}

export {moviesApiService}