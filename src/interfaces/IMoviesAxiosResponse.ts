import {IMovie} from "./IMovie";

export interface IMoviesAxiosResponse{
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number
}