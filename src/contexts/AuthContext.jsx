import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { authenticateLogin, createUser } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded._id,
          name: decoded.name,
          email: decoded.email,
          isAdmin: decoded.isAdmin,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem("auth-token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authenticateLogin({ email, password });
      const token = response;
      localStorage.setItem("auth-token", token);

      const decoded = jwtDecode(token);
      setUser({
        id: decoded._id,
        name: decoded.name,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await createUser(userData);
      console.log(response);

      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        registerUser,
        logout,
        isAdmin: user?.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
