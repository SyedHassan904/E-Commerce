import "./pagination.css"
import React from "react"

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5
}) {
    const getVisiblePages = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="paginationContainer">
            <div className="pagSecCon">
                <button
                    className={`paginationButton prevButton ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                <div className="paginationNumbers">
                    {visiblePages.map((page) => (
                        <button
                            key={page}
                            className={`paginationNumber ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    className={`paginationButton nextButton ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

