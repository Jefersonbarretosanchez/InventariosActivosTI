import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/activos');
  };

  return (
    <div>
      <h1>No tienes permiso para acceder a esta página.</h1>
      <button onClick={handleRedirect}>Ir a Activos</button>
    </div>
  );
};

export default NotAuthorized;
