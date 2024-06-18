import React, {useEffect} from 'react';
import {MoviesListCardComponent} from "./MoviesListCardComponent";
import {useAppDispatch, useAppSelector} from "../../redux/Store";
import {moviesActions} from "../../redux/slices/moviesSlice";
import css from "./movies.list.module.css"
import {PaginationNextPrevComponent} from "../paginations/PaginationNextPrevComponent";
import {useSearchParams} from "react-router-dom";
import PaginationPagesComponent from "../paginations/PaginationPageNumbersComponent";


const MoviesListComponent = () => {

    //===========================================================================================================

    const dispatch = useAppDispatch();
    const {movies, totalPages, status} = useAppSelector(state => state.movies);
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || '1'

    useEffect(() => {

        dispatch(moviesActions.getAllMovies(page))

    }, [dispatch, page]);

    //===========================================================================================================

    return (
        <div>
            <div className={css.movieList}>
                {status === 'loading' ? (<p>Loading...</p>)
                    : movies.map(movie => <div key={movie.id}><MoviesListCardComponent movie={movie}/></div>)}
            </div>

            <div className={css.pagination_block}>
                {status !== 'loading' &&
                    <div><PaginationPagesComponent currentPage={page} totalPages={totalPages}/></div>}
            </div>
        </div>
    );
};

export {MoviesListComponent};