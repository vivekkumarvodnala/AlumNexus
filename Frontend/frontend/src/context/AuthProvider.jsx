// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedName = localStorage.getItem("name");
  const storedRole = localStorage.getItem("role");

  // initialize immediately from localStorage
  const [user, setUser] = useState(
    storedToken && storedName && storedRole
      ? { name: storedName, role: storedRole }
      : null
  );
  const [token, setToken] = useState(storedToken || null);

  // no need for loading flicker anymore
  useEffect(() => {
    if (storedToken && storedName && storedRole) {
      setUser({ name: storedName, role: storedRole });
      setToken(storedToken);
    }
  }, []);

  const login = (name, role, token) => {
    setUser({ name, role });
    setToken(token);

    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
