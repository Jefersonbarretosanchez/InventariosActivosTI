import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user } = useContext(AuthContext);

  console.log('ProtectedRoute user:', user);
  if (!user) {
    return <Navigate to="/" />;
  }

  const permisos = JSON.parse(localStorage.getItem('permisos'));

  // Verificar si el usuario tiene el permiso requerido para acceder a la ruta
  if (requiredPermission && (!permisos || permisos[requiredPermission] === 'n/a')) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
