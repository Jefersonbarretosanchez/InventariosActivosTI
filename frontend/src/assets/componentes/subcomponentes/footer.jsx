
import React from 'react';

function Footer() {
    const flechapag = ">>";
    return (
        <footer className='footer'>
            <div className='Paginacion'>
                <a href='#' className='pagina-link active'>1</a>
                <a href='#' className='pagina-link'>2</a>
                <a href='#' className='pagina-link'>3</a>
                <a href='#' className='pagina-link'>4</a>
                <a href='#' className='pagina-link'>5</a>
                <a href='#' className='pagina-link'>{flechapag}</a>
            </div>
            <div className='copyright'>
                Copyright © 2024 Relia Energy, All Rights Reserved
            </div>
        </footer>
    );
}

export default Footer;
