import { Box, Typography } from "@mui/material";
import TaskList from "../../src/components/tasks/TaskList/TaskList.jsx";

export default function Tasks() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Tasks Management
      </Typography>
      <TaskList />
    </Box>
  );
}
