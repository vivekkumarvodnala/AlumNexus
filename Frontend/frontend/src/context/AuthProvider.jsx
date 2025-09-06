import { createContext, useContext, useState } from "react";

// 1️⃣ Create Context
const AuthContext = createContext();

// 2️⃣ Custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  // Initially no user (public)
  const [user, setUser] = useState(null);

  // 🔹 Simulated login
  const login = (name, role) => {
    // role can be "student", "alumni", "admin"
    setUser({ name, role });
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
