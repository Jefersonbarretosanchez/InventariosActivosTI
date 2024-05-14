import React from 'react';
import errorImg from '../imagenes/error.jpg'; // Reemplaza con la ruta a tu imagen

const NotFound = () => {
  return (
    <div className="not-found-page">
      <img src={errorImg} alt="Página no encontrada"  style={{height:'100%',
        width:'100%',
      }}/>
      {/* <h1>¡Ups! Página perdida en el ciberespacio</h1>
      <p>Parece que la página que buscas se ha ido de viaje o nunca existió.</p>
      <p>No te preocupes, puedes:</p>
      <ul>
        <li>Regresar a la página de inicio: <a href="/">Inicio</a></li>
        <li>Intentar buscar lo que necesitas: <form action="/">
          <input type="text" placeholder="Buscar..." />
          <button type="submit">Buscar</button>
        </form></li>
        <li>Contactarnos si el problema persiste: <a href="mailto:soporte@tusitio.com">Soporte</a></li>
      </ul> */}
    </div>
  );
};

export default NotFound;