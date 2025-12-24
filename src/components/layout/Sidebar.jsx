import {
  Drawer,
  Toolbar,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChecklistIcon from "@mui/icons-material/Checklist";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Tasks", icon: <ChecklistIcon />, path: "/tasks" },
  {
    text: "Notifications",
    icon: <NotificationsIcon />,
    path: "/notifications",
  },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth = 240,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => {
              if (isMobile && handleDrawerToggle) handleDrawerToggle();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton
          onClick={() => {
            handleLogout();
            if (isMobile && handleDrawerToggle) handleDrawerToggle();
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
