import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import { Button } from "../common/Button";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useColorMode } from "../../theme/ThemeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from "@mui/material/Tooltip";

export default function Header({ handleDrawerToggle }) {
  const { user } = useAuth();
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap component="div">
          Smart Tasks Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Tooltip
          title={`Switch to ${
            theme.palette.mode === "dark" ? "light" : "dark"
          } mode`}
        >
          <IconButton color="inherit" onClick={toggleColorMode} sx={{ mr: 2 }}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1">{user?.name}</Typography>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        ) : (
          <Button
            component={RouterLink}
            to="/login"
            color="inherit"
            startIcon={<AccountCircle />}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
