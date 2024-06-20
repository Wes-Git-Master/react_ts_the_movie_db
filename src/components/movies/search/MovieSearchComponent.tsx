import React, {useState} from 'react';
import {useSearchParams} from "react-router-dom";
import css from "../../../styles/movies.list.module.css";

const MovieSearchComponent = () => {

    //===========================================================================================================

    const [searchParams, setSearchParams] = useSearchParams();
    const genreId = searchParams.get('genre') || ''
    const initQuery = searchParams.get('query') || ''
    const [query, setQuery] = useState(initQuery)


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const handleSearchSubmit = () => {
        setSearchParams({ page: '1', genre: genreId, query })
    }

    //===========================================================================================================

    return (
        <div className={css.searchContainer}>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search by movie title..."
            />
            <button onClick={handleSearchSubmit}>Search</button>
        </div>
    );
};

export {MovieSearchComponent};
