// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const storedId = localStorage.getItem("id");
  const storedToken = localStorage.getItem("token");
  const storedName = localStorage.getItem("name");
  const storedRole = localStorage.getItem("role");
  
  // initialize immediately from localStorage
  const [user, setUser] = useState(
    storedToken && storedName && storedRole
      ? {id:storedId, name: storedName, role: storedRole }
      : null
  );
  const [token, setToken] = useState(storedToken || null);

  // no need for loading flicker anymore
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
