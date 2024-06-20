import React, {FC, useEffect, useState} from 'react';
import {IGenre} from "../../../interfaces/IGenre";
import {useSearchParams} from 'react-router-dom';
import {moviesApiService} from "../../../services/movies.api.service";
import css from "../../../styles/genre.dropdown.module.css"


const GenresDropdownComponent: FC = () => {

    //===========================================================================================================

    const [genres, setGenres] = useState<IGenre[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedGenre = searchParams.get('genre') || '';

    useEffect(() => {
        const axiosGenres = async () => {
            const response = await moviesApiService.getGenres();
            setGenres(response.genres);
        };

        axiosGenres().then();
    }, []);

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const genreId = event.target.value;
        setSearchParams({genre: genreId, page: '1'})
    };

    return (
        <div className={css.dropdown_Container}>
            <label htmlFor="genres">Choose a genre:</label>
            <select id="genres" value={selectedGenre} onChange={handleGenreChange}>
                <option value="">All Genres</option>
                {genres.map((genre) =>
                    (<option key={genre.id} value={genre.id.toString()}>{genre.name}</option>))}
            </select>
        </div>
    );
};

export {GenresDropdownComponent};
