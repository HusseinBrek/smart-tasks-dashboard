import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskItem from "../TaskItem/TaskItem";
import { Button } from "../../common/Button";
import { ChildModal } from "../../common/Modal";
import { TaskForm } from "../TaskForm";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTasks } from "../../../context/TasksContext";

export default function TaskList() {
  const {
    tasks,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    toggleTaskCompletion,
    deleteTask,
    addNewTask,
    editTask,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const [filterTab, setFilterTab] = useState("all");

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

  const handleSaveTask = async (taskData) => {
    const success = editingTask
      ? await editTask(editingTask.id, taskData)
      : await addNewTask(taskData);

    if (success) {
      handleCloseModal();
    }
  };

  const handleDeleteTask = async (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleToggleComplete = async (taskId) => {
    const taskToToggle = tasks.find((t) => t.id === taskId);
    if (taskToToggle) {
      await toggleTaskCompletion(taskId, taskToToggle.completed);
    }
  };

  const displayedTasks = filteredTasks.filter((task) => {
    if (filterTab === 1) {
      return !task.completed;
    }
    if (filterTab === 2) {
      return task.completed;
    }
    return true;
  });

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  const deleteConfirm = tasks.find((t) => t.id === deleteTaskId);

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
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={filterTab}
          onChange={(e, newValue) => setFilterTab(newValue)}
          variant="fullWidth"
        >
          <Tab
            label={`All (${totalTasks})`}
            sx={{
              color: "primary.main",
              fontWeight: filterTab === 0 ? "bold" : "normal",
            }}
          />
          <Tab
            label={`Pending ${pendingTasksCount}`}
            sx={{
              color: "warning.main",
              fontWeight: filterTab === 1 ? "bold" : "normal",
            }}
          />
          <Tab
            label={`Completed (${completedTasksCount})`}
            sx={{
              color: "success.main",
              fontWeight: filterTab === 2 ? "bold" : "normal",
            }}
          />
        </Tabs>
      </Paper>
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

      <Box>
        {displayedTasks.length === 0 ? (
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
          displayedTasks.map((task) => (
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
            {deleteConfirm?.title ? `: "${deleteConfirm.title}"` : "?"} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTaskId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={async () => {
              const success = await deleteTask(deleteTaskId);
              if (success) {
                setDeleteTaskId(null);
              } else {
                console.error("Error deleting task");
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
