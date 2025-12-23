import Grid from "@mui/material/Grid";
import { Box, Typography, Paper } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PendingIcon from "@mui/icons-material/Pending";
import { BasicCard } from "../../components/common/Card";
import { useTasks } from "../../context/TasksContext";
import { useTheme } from "@mui/material/styles";

export default function Dashboard() {
  const theme = useTheme();
  const { tasks, isLoading, error } = useTasks();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>Error: {typeof error === "string" ? error : error.message}</div>
    );
  }

  const highPriorityTasks = tasks.filter(
    (t) => t.priority === "high" && !t.completed
  ).length;

  const isDarkMode = theme.palette.mode === "dark";

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <ChecklistIcon />,
      color: isDarkMode
        ? theme.palette.primary.light
        : theme.palette.primary.main,
      bgcolor: isDarkMode
        ? "rgba(25, 118, 210, 0.2)"
        : "rgba(25, 118, 210, 0.2)",
      iconColor: isDarkMode
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <DoneAllIcon />,
      color: isDarkMode
        ? theme.palette.success.light
        : theme.palette.success.main,
      bgcolor: isDarkMode ? "rgba(46, 125, 50, 0.2)" : "rgba(46, 125, 50, 0.2)",
      iconColor: isDarkMode
        ? theme.palette.success.light
        : theme.palette.success.main,
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <PendingIcon />,
      color: isDarkMode
        ? theme.palette.warning.light
        : theme.palette.warning.main,
      bgcolor: isDarkMode ? "rgba(237, 108, 2, 0.2)" : "rgba(237, 108, 2, 0.2)",
      iconColor: isDarkMode
        ? theme.palette.warning.light
        : theme.palette.warning.main,
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      icon: <ChecklistIcon />,
      color: isDarkMode ? theme.palette.error.light : theme.palette.error.main,
      bgcolor: isDarkMode ? "rgba(211, 47, 47, 0.2)" : "rgba(211, 47, 47, 0.2)",
      iconColor: isDarkMode
        ? theme.palette.error.light
        : theme.palette.error.main,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: stat.bgcolor,
                height: "100%",
                position: "relative",
                overflow: "hidden",
                border: `1px solid ${stat.bgcolor}`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: stat.color, fontWeight: 600 }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      color: stat.color,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: stat.iconColor,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "50%",
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <BasicCard title="Recent Tasks" sx={{ height: "100%" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ py: 4 }}
            >
              Navigate to Tasks page to see and manage all your tasks
            </Typography>
          </BasicCard>
        </Grid>
      </Grid>
    </Box>
  );
}
