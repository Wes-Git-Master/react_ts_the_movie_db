import React, {useEffect, useState} from 'react';
import {MoviesListCardComponent} from "./MoviesListCardComponent";
import {useAppDispatch, useAppSelector} from "../../../redux/Store";
import {moviesActions} from "../../../redux/slices/moviesSlice";
import css from "../../../styles/movies.list.module.css"
import {useSearchParams} from "react-router-dom";
import PaginationPagesComponent from "../../paginations/PaginationPageNumbersComponent";
import {useLoading} from "../../../hooks/useLoading";
import {BeatLoader} from "react-spinners";
import GenresDropdownComponent from "../genres/GenresDropdownComponent";


const MoviesListComponent = () => {

    //===========================================================================================================

    const dispatch = useAppDispatch();
    const {movies, totalPages, status} = useAppSelector(state => state.movies);
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || '1'
    const genreId = searchParams.get('genre') || ''
    const loading = useLoading(status);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {

        dispatch(moviesActions.getAllMovies({page, genreId}))

    }, [dispatch, page, genreId]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1225) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    //===========================================================================================================

    return (
        <div>
            {status !== 'loading' ? <GenresDropdownComponent/> : ""}

            <div className={css.movieList}>
                {status === 'loading' ? (<div className={css.load}>
                        <p>Loading</p>
                        <BeatLoader color="red" loading={loading} size={16}/></div>)
                    : movies.map(movie => <div key={movie.id}><MoviesListCardComponent movie={movie}/></div>)}
            </div>

            <div className={css.pagination_block}>
                {status !== 'loading' &&
                    <div><PaginationPagesComponent currentPage={page} totalPages={totalPages}/></div>}
            </div>

            {showScrollToTop && (
                <button className={css.scrollToTop} onClick={scrollToTop}>↑</button>
            )}

        </div>
    );
};

export {MoviesListComponent};