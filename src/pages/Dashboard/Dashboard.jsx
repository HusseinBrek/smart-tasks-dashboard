import Grid from "@mui/material/Grid";
import { Box, Typography, Paper } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PendingIcon from "@mui/icons-material/Pending";
import { BasicCard } from "../../components/common/Card";
import { mockTasks } from "../../data/mockTasks";

export default function Dashboard() {
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = mockTasks.filter(
    (t) => t.priority === "high" && !t.completed
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <ChecklistIcon />,
      color: "#1976d2",
      bgcolor: "#e3f2fd",
      iconColor: "#1976d2",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <DoneAllIcon />,
      color: "#2e7d32",
      bgcolor: "#e8f5e9",
      iconColor: "#2e7d32",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <PendingIcon />,
      color: "#ed6c02",
      bgcolor: "#fff3e0",
      iconColor: "#ed6c02",
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      icon: <ChecklistIcon />,
      color: "#d32f2f",
      bgcolor: "#ffebee",
      iconColor: "#d32f2f",
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
          <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
        <Grid item size={{ xs: 12, sm: 6, md: 12 }}>
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
