import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  console.log('ProtectedRoute user:', user);

  if (!user) {
    return <Navigate to="/" />;
  }

  const permisos = JSON.parse(localStorage.getItem('permisos'));

  // Si el usuario tiene el rol "Agente RRHH" y está intentando acceder al módulo de Activos
  if (user?.role === 'Agente RRHH' && requiredPermission === 'activos' && permisos?.activos === 'n/a') {
    return <Navigate to="/personas" replace />;
  }

  // Verificar si el usuario tiene el permiso requerido para acceder a la ruta
  if (requiredPermission && (!permisos || permisos[requiredPermission] === 'n/a')) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
