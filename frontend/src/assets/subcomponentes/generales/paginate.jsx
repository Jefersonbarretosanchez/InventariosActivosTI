import React from 'react'

function Paginate() {
    const flechapag = ">>";
    return (
        <section>
            <div className='Paginacion'>
                <a href='#' className='pagina-link active'>1</a>
                <a href='#' className='pagina-link'>2</a>
                <a href='#' className='pagina-link'>3</a>
                <a href='#' className='pagina-link'>4</a>
                <a href='#' className='pagina-link'>5</a>
                <a href='#' className='pagina-link'>{flechapag}</a>
            </div>
        </section>
    );
}

export default Paginate;
