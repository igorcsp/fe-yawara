import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Rota para usuários normais
export const PrivateRoute = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return user ? <Outlet /> : navigate("/login");
};

// Rota para administradores
export const AdminRoute = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

// Rota de login
export const LoginRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Outlet />;
};
