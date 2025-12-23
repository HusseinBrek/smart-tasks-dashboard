import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useMemo } from "react";
import { ColorModeContext } from "./ThemeContext";

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("themeMode") || "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          ...(mode === "dark" && {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
