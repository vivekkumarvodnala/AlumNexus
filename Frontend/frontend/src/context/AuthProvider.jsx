// src/context/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage on refresh
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");

    if (storedId && storedToken && storedName && storedRole) {
      setUser({ id: storedId, name: storedName, role: storedRole });
      setToken(storedToken);
    }
  }, []);

  // Login
  const login = (id, name, role, token) => {
    const userData = { id, name, role };
    setUser(userData);
    setToken(token);

    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
