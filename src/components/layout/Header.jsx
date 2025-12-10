import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";

export default function Header() {
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
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
