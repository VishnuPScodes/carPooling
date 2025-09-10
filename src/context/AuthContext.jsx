import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    // In a real app, you would validate credentials with a backend
    // For now, let's just simulate a successful login
    setIsAuthenticated(true);
    return true;
  };

  const register = (username, email, password) => {
    // In a real app, you would register the user with a backend
    // For now, let's just simulate a successful registration
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
