import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { Box, Checkbox, Typography, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskItem({ task, onToggleComplete }) {
  const getPriorityColor = (priority) => {
    if (priority === "high") {
      return "error";
    } else if (priority === "medium") {
      return "warning";
    } else {
      return "primary";
    }
  };
  const cardActions = (
    <Box>
      <Button variant="outlined" size="small" sx={{ mr: 1 }}>
        <EditIcon sx={{ fontSize: "1.5rem" }} />
      </Button>
      <Button variant="outlined" size="small">
        <DeleteIcon sx={{ fontSize: "1.5rem" }} />
      </Button>
    </Box>
  );
  return (
    <Card actions={cardActions}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <Typography
            variant="h6"
            sx={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </Typography>
        </Box>
        <Chip
          label={task.priority}
          color={getPriorityColor(task.priority)}
          size="small"
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
        Due Date: {task.dueDate}
      </Typography>
    </Card>
  );
}
