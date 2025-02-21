import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  PrivateRoute,
  AdminRoute,
  LoginRoute,
} from "./components/common/ProtectedRoutes";
import Layout from "./components/layout/MainLayout";
import LoginPage from "./pages/Authentication/LoginPage";
import RegisterPage from "./pages/Authentication/RegisterPage";
import HomePage from "./pages/HomePage";
import Unauthorized from "./pages/Errors/Unauthorized";
import ProductsPage from "./pages/Product/ProductsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/Errors/NotFoundPage";
import ProductDetails from "./components/products/ProductDetails";
import NewProductPage from "./pages/Product/NewProductPage";
import ProfilePage from "./pages/Authentication/ProfilePage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/products">
              <Route index element={<ProductsPage />} />
              <Route path=":id" element={<ProductDetails />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route element={<LoginRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<HomePage />} />
              <Route path="products">
                <Route path="new" element={<NewProductPage />} />
                <Route path=":id" element={<ProductDetails />} />
                <Route path=":id/edit" element={<div>edit page</div>} />

                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="users" element={<div>Gerenciar Usuários</div>} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
