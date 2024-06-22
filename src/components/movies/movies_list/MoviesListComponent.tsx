import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks/redux.type.hooks";
import {useSearchParams} from "react-router-dom";
import {useLoading} from "../../../hooks/useLoading";
import {moviesActions} from "../../../redux/slices/moviesSlice";
import {GenresDropdownComponent} from "../genres/GenresDropdownComponent";
import {BeatLoader} from "react-spinners";
import {MoviesListCardComponent} from "./MoviesListCardComponent";
import {PaginationPageNumbersComponent} from "../../paginations/PaginationPageNumbersComponent";
import {MovieSearchComponent} from "../../search/MovieSearchComponent";
import css from "../../../styles/movies.list.module.css";
import css_common from "../../../styles/css_common/button.module.css"
import {ScrollToTopButton} from "../../buttons/ScrollToTopButton";
import {Button} from "../../buttons/Button";

const MoviesListComponent = () => {

    //===========================================================================================================

    const dispatch = useAppDispatch();
    const {movies, totalPages, status} = useAppSelector(state => state.movies);
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || '1';
    const genreId = searchParams.get('genre') || '';
    const loading = useLoading(status);

    useEffect(() => {
        dispatch(moviesActions.getAllMovies({page, genreId}));
    }, [dispatch, page, genreId]);

    const handleSearch = (query: string) => {
        if (query.trim() !== '') {
            dispatch(moviesActions.searchMovies({query, page}));
        } else {
            dispatch(moviesActions.getAllMovies({page, genreId}));
        }
    };

    //===========================================================================================================

    return (
        <div>
            {status !== 'loading' && totalPages > 0 && movies.length !== 0 && (
                <div className={css.genre_search}>
                    <MovieSearchComponent onSearch={handleSearch}/>
                    <GenresDropdownComponent/>
                </div>
            )}

            <div className={css.movieList}>
                {status === 'loading' ? (
                    <div className={css.load}>
                        <p>Loading</p>
                        <BeatLoader color="red" loading={loading} size={16}/>
                    </div>
                ) : (

                    movies.length > 0 ? (
                        movies.map(movie => (
                            <div key={movie.id}>
                                <MoviesListCardComponent movie={movie}/>
                            </div>
                        ))
                    ) : (
                        <div className={css.no_results}>
                            <Button className={css_common.generalButton}/>
                            <div>
                                <p>No results</p>
                                <span><BeatLoader color="red" loading={loading} size={16}/></span>
                            </div>
                        </div>
                    )
                )}
            </div>

            <div className={css.pagination_block}>
                {status !== 'loading' && totalPages > 0 && movies.length !== 0 && (
                    <PaginationPageNumbersComponent currentPage={page} totalPages={totalPages}/>
                )}
            </div>
            <ScrollToTopButton threshold={1225}/>
        </div>
    );
};

export {MoviesListComponent};
