import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Rota para usuários normais
export const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

// Rota para administradores
export const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return user && user.isAdmin === true ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/unauthorized" />
  );
};

// Rota de login
export const LoginRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Outlet />;
};
