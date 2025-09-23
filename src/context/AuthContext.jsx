// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { loginUserAPI, registerUserAPI, getUserById } from "../api/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      (async () => {
        try {
          const data = await getUserById(userId);
          setUser(data);
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUserAPI({ email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user._id);
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const data = await registerUserAPI({ name, email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user._id);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
