import { useState } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskItem from "../TaskItem/TaskItem";
import { Button } from "../../common/Button";
import { ChildModal } from "../../common/Modal";
import { TaskForm } from "../TaskForm";
import { mockTasks } from "../../../data/mockTasks";

export default function TaskList() {
  const [tasks, setTasks] = useState(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...taskData,
                id: editingTask.id,
                completed: editingTask.completed,
              }
            : task
        )
      );
    } else {
      const newTask = {
        ...taskData,
        id: Date.now(),
        completed: false,
      };
      setTasks([newTask, ...tasks]);
    }
  };

  // handleDeleteTask
  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <Box>
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
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
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
    </Box>
  );
}
