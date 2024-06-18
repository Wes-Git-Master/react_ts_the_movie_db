import React, {FC} from 'react';
import {useSearchParams} from 'react-router-dom';

interface IPaginationProps {
    currentPage: number;
    totalPages: number;
}

const PaginationComponent: FC<IPaginationProps> = ({currentPage, totalPages}) => {

    //===========================================================================================================

    const [searchParams, setSearchParams] = useSearchParams();

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setSearchParams({page: (currentPage + 1).toString()});
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setSearchParams({page: (currentPage - 1).toString()});
        }
    };

    //===========================================================================================================

    return (
        <div>

            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </button>

            <span>Page {currentPage} of {totalPages}</span>

            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </button>

        </div>
    );
};

export {PaginationComponent};
