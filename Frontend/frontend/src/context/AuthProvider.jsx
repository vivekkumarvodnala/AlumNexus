// src/context/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedName && storedRole) {
      setUser({ name: storedName, role: storedRole });
      setToken(storedToken);
    }
  }, []);

  // Login
  const login = (name, role, token) => {
    setUser({ name, role });
    setToken(token);

    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
  };

  // Logout
      const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
