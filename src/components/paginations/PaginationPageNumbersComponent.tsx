import React, {FC} from 'react';
import {useSearchParams} from 'react-router-dom';
import css from "../../styles/pagination.page.numbers.module.css"

interface IProps {
    currentPage: string,
    totalPages: number,
    pagesPerGroup: number
}

const PaginationPageNumbersComponent: FC<IProps> = ({currentPage, totalPages, pagesPerGroup}) => {

    //===========================================================================================================

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPageNumber = parseInt(currentPage);
    const currentGroup = Math.ceil(currentPageNumber / pagesPerGroup);

    const handlePageChange = (page: number) => {
        const genre = searchParams.get('genre') || ''
        setSearchParams({page: page.toString(), genre});
    };

    const generatePageNumbers = () => {
        const pages = [];
        const startPage = (currentGroup - 1) * pagesPerGroup + 1;
        const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    //===========================================================================================================

    return (
        <div className={css.pagination_block}>
            <button onClick={() => handlePageChange(currentPageNumber - 1)}
                    disabled={currentPageNumber === 1}
                    className={css.button_prev}>
                Prev
            </button>
            {generatePageNumbers().map(page => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPageNumber}
                    className={`${css.button_pages} ${page === currentPageNumber ? css.current_page : ''}`}
                >
                    {page}
                </button>
            ))}
            <button onClick={() => handlePageChange(currentPageNumber + 1)}
                    disabled={currentPageNumber === totalPages}
                    className={css.button_next}>
                Next
            </button>
        </div>
    );
};

export {PaginationPageNumbersComponent};
