import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import { Button } from "../common/Button";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user } = useAuth();
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          Smart Tasks Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

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
