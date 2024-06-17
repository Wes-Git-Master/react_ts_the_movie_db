import axios, {AxiosError, AxiosResponse} from "axios";
import {baseURL, posterBaseURL} from "../constants/urls";
import {IMoviesAxiosResponse} from "../interfaces/IMoviesAxiosResponse";
import {IMoviePoster} from "../interfaces/IMoviePoster";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {"Content-Type": "application/json"}
});

axiosInstance.interceptors.request.use(req => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDVlNzYyY2YzNzIyNmU1ODQ2MzExN2NlOWM0NGYwNSIsInN1YiI6IjY2NmRmZTYzZDhhOTc1ZTE0NWM0YTQ0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ct1vb_D4hq1Q2TPFzBK0KCHcCD6chSx7mRt7a9AKsFE"

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

const moviesApiService = {

    getAllMovies: async (): Promise<IMoviesAxiosResponse> => {
        const response = await axiosInstance.get<IMoviesAxiosResponse>(`${baseURL}/discover/movie?page=1`);
        return response.data
    },
    getPoster: async (poster_path: string): Promise<IMoviePoster> => {

        const response = await axiosInstance.get<IMoviePoster>(`${posterBaseURL + poster_path}`);
        return response.data

    }

}

export {moviesApiService}