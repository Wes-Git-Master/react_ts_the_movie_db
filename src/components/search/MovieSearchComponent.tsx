import React, {FC, useState} from 'react';
import css from "../../styles/movie.search.module.css"

interface IProps {
    onSearch: (query: string) => void
}

const MovieSearchComponent: FC<IProps> = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    return (
        <div className={css.searchContainer}>
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={handleInputChange}
            />
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
};

export {MovieSearchComponent};
