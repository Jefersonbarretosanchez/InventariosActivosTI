import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faBackwardStep, faForward, faForwardFast, faForwardStep, faStepForward } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function Paginate({ currentPage, totalPages, onPageChange }) {
    const flechapag = ">>";
    const flechapagant = "<<";
    const maxPagesToShow = 7;
    const inicio = "<"


    let startPage, endPage;
    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxPagesToShow / 2);
            endPage = currentPage + Math.floor(maxPagesToShow / 2);
        }
    }

    return (
        <section>
            <div className='Paginacion'>
                {currentPage > 1 && (
                    <a
                        href='#'
                        className='pagina-link'
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(1);
                        }}
                    >
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </a>
                )}
                {currentPage > 1 && (
                    <a
                        href='#'
                        className='pagina-link'
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage - 1);
                        }}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </a>
                )}

                {/* Page number links */}
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                    const pageNumber = startPage + index;
                    return (
                        <a
                            href='#'
                            key={pageNumber}
                            className={`pagina-link ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(pageNumber);
                            }}
                        >
                            {pageNumber}
                        </a>
                    );
                })}

                {/* Button to go to the next page */}
                {currentPage < totalPages && (
                    <a
                        href='#'
                        className='pagina-link'
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage + 1);
                        }}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </a>
                )}

                {/* Button to go to the last page */}
                {currentPage < totalPages && (
                    <a
                        href='#'
                        className='pagina-link'
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(totalPages);
                        }}
                    >
                        <FontAwesomeIcon icon={faForwardStep} />

                    </a>
                )}
            </div>
        </section>
    );
}

export default Paginate;
