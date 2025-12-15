import { Box, Typography } from "@mui/material";
import { TaskList } from "../../components/tasks/TaskList";

export default function Tasks() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Task Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage all your tasks. Add, edit, delete, and track progress.
      </Typography>

      <TaskList />
    </Box>
  );
}
