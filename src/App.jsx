import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Settings } from "./pages/Settings";
import Layout from "./components/layout/Layout";
import { TasksProvider } from "./context/TasksProvider";
import { Login } from "./pages/Login";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
