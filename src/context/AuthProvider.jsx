import { AuthContext } from "./AuthContext";
import { loginUser, registerUser } from "../api/authService";
import { toast } from "react-hot-toast";
import { useState } from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
      return true;
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Login failed. Please check your email and password.");
      return false;
    }
  };
  const register = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      setUser(newUser);
      toast.success(`Welcome, ${newUser.name}!`);
      return true;
    } catch (err) {
      console.error("Register Error:", err);
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
