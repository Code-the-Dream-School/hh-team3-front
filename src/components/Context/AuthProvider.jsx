import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setUser(null);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${url}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("AuthProvider: error fetching user profile:", err);
      logout();
    }
  };

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated, fetchUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;