import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Settings } from "./pages/Settings";
import Layout from "./components/layout/Layout";
import { TasksProvider } from "./context/TasksProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Login } from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { Register } from "./pages/Register";
import AppThemeProvider from "./theme/AppThemeProvider";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <TasksProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TasksProvider>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </AppThemeProvider>
  );
}

export default App;
