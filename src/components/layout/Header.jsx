import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
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

        <Box
          sx={{
            position: "relative",
            borderRadius: 1,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.25)" },
            mr: 2,
          }}
        >
          <Box
            sx={{
              p: "0 8px",
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search tasks..."
            inputProps={{ "aria-label": "search" }}
            sx={{ color: "inherit", pl: "32px", pr: "8px" }}
          />
        </Box>
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
