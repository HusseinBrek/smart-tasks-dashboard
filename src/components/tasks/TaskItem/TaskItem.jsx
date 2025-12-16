import { Box, Checkbox, Typography, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BasicCard } from "../../common/Card";
import { Button } from "../../common/Button";

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const getPriorityColor = (priority) => {
    if (priority === "high") {
      return "error";
    } else if (priority === "medium") {
      return "warning";
    } else {
      return "primary";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const cardActions = (
    <Box>
      <Button
        variant="outlined"
        size="small"
        sx={{ mr: 1 }}
        onClick={() => onEdit(task)}
      >
        <EditIcon sx={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => onDelete(task.id)}
      >
        <DeleteIcon sx={{ fontSize: "1.2rem" }} />
      </Button>
    </Box>
  );

  return (
    <BasicCard actions={cardActions} sx={{ opacity: task.completed ? 0.7 : 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            color="primary"
          />
          <Typography
            variant="h6"
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "text.secondary" : "text.primary",
            }}
          >
            {task.title}
          </Typography>
        </Box>
        <Chip
          label={task.priority}
          color={getPriorityColor(task.priority)}
          size="small"
          variant="outlined"
        />
      </Box>

      {task.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ml: 6, mb: 1 }}
        >
          {task.description}
        </Typography>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ ml: 6 }}>
        Due Date: {formatDate(task.dueDate)}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ ml: 6, display: "block" }}
      >
        Status: {task.completed ? "Completed" : "Pending"}
      </Typography>
    </BasicCard>
  );
}
