import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const ProtectedRoute = ({ children, requiredRole  }) => {
  const { user } = useContext(AuthContext);

  // console.log('ProtectedRoute user:', user); // Verifica el estado del usuario
  if (!user) {
    return <Navigate to="/" />;
  }

  // Verificar el rol del usuario
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/no_autorizado" />; // Redirigir a una página de acceso denegado o a otra ruta
  }

  return children;
};

export default ProtectedRoute;
