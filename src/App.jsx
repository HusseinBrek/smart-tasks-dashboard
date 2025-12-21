import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Settings } from "./pages/Settings";
import Layout from "./components/layout/Layout";
import { TasksProvider } from "./context/TasksProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Login } from "./pages/Login";
import { Toaster } from "react-hot-toast";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <TasksProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="settings" element={<Settings />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </TasksProvider>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default App;
