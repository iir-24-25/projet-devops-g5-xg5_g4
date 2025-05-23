import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: JSX.Element;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  // Vérifie si le token admin est présent dans le localStorage
  const isAdminAuthenticated = localStorage.getItem('adminToken') !== null;

  // Si l'admin n'est pas connecté, rediriger vers la page de login admin
  if (!isAdminAuthenticated) {
    alert("❌ Accès refusé. Vous devez vous connecter en tant qu'administrateur.");
    return <Navigate to="/admin-login" replace />;
  }

  // Sinon, afficher la page demandée
  return children;
};

export default ProtectedAdminRoute;
