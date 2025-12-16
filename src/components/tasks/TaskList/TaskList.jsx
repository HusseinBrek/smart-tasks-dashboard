import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskItem from "../TaskItem/TaskItem";
import { Button } from "../../common/Button";
import { ChildModal } from "../../common/Modal";
import { TaskForm } from "../TaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../../api/tasksService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleOpenModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTasks();
        setTasks(data.slice().reverse());
      } catch (err) {
        setError(
          `Failed to load tasks. Check if JSON Server is running on port 3001. ${err.message}`
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask.id, taskData);
        setTasks(
          tasks.map((task) => (task.id === editingTask.id ? updatedTask : task))
        );
      } else {
        const newTask = await createTask({ ...taskData, completed: false });
        setTasks((prevTasks) => [newTask, ...prevTasks]);
      }
      handleCloseModal();
    } catch (err) {
      setError(`Failed to save task: ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleToggleComplete = async (taskId) => {
    const taskToToggle = tasks.find((t) => t.id === taskId);
    if (!taskToToggle) return;

    const newStatus = !taskToToggle.completed;

    try {
      const updatedTask = await updateTask(taskId, { completed: newStatus });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      setError(`Failed to toggle task status: ${err.message}`);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const term = searchTerm.toLowerCase();
    const title = (task.title || "").toLowerCase();
    const description = (task.description || "").toLowerCase();
    return title.includes(term) || description.includes(term);
  });

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  const deletingTask = tasks.find((t) => t.id === deleteTaskId);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4, mt: 5 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Tasks...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h2">
          Tasks List
        </Typography>
        <Button onClick={handleOpenModal}>Add New Task</Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Typography variant="body2" color="primary">
          Total: {totalTasks}
        </Typography>
        <Typography variant="body2" color="success.main">
          Completed: {completedTasksCount}
        </Typography>
        <Typography variant="body2" color="warning.main">
          Pending: {pendingTasksCount}
        </Typography>
      </Box>

      <Box>
        {filteredTasks.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ py: 4 }}
          >
            {searchTerm
              ? "No tasks found matching your search."
              : "No tasks available. Add your first task!"}
          </Typography>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </Box>

      <ChildModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          handleClose={handleCloseModal}
          taskToEdit={editingTask}
          onSave={handleSaveTask}
        />
      </ChildModal>

      <Dialog
        open={Boolean(deleteTaskId)}
        onClose={() => setDeleteTaskId(null)}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task
            {deletingTask?.title ? `: "${deletingTask.title}"` : "?"} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTaskId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={async () => {
              try {
                await deleteTask(deleteTaskId);
                setTasks((prev) => prev.filter((t) => t.id !== deleteTaskId));
                setDeleteTaskId(null);
              } catch (err) {
                setError(`Failed to delete task: ${err.message}`);
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
