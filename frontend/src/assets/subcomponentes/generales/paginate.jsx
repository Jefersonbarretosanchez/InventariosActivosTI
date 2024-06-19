import React from 'react';

function Paginate({ currentPage, totalPages, onPageChange }) {
    const flechapag = ">>";
    const flechapagant = "<<";

    return (
        <section>
            <div className='Paginacion'>
                {currentPage > 1 && (
                    <a
                        href='#'
                        className='pagina-link'
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage - 1);
                        }}
                    >
                        {flechapagant}
                    </a>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                    <a
                        href='#'
                        key={index}
                        className={`pagina-link ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(index + 1);
                        }}
                    >
                        {index + 1}
                    </a>
                ))}
                {currentPage < totalPages && (
                    <a
                        href='#'
                        className='pagina-link'
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage + 1);
                        }}
                    >
                        {flechapag}
                    </a>
                )}
            </div>
        </section>
    );
}

export default Paginate;
