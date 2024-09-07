import React, { useMemo } from 'react';
import './PaginationContainer.css';
import ArrowLeft from '../../assets/svg/ArrowLeft';
import ArrowRight from '../../assets/svg/ArrowRight';
import DropDownArrow from '../../assets/svg/DropDownArrow';


const PaginationContainer = ({ rowsPerPage, setRowsPerPage, currentPage, setCurrentPage, totalRows }) => {
    const totalPages = useMemo(() => Math.ceil(totalRows / rowsPerPage), [totalRows, rowsPerPage]);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to first page when rows per page change
    };

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="pagination-container">
            <div className="show-rows">
                Show rows per page
                <div className="select-wrapper">
                    <select className="rows-select" value={rowsPerPage} onChange={handleRowsPerPageChange}>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <DropDownArrow />
                </div>
            </div>
            <div className="pagination-right">
                <div className="page-info">
                    <span className="page-info-bold">{currentPage}-10</span> of {totalPages}
                </div>
                <div className="page-controls">
                    <button
                        className="arrow-button"
                        onClick={() => handlePageChange('prev')}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        className="arrow-button"
                        onClick={() => handlePageChange('next')}
                        disabled={currentPage === totalPages}
                    >
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationContainer;
