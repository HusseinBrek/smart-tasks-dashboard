import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TaskItem from "../TaskItem/TaskItem.jsx";
import { mockTasks } from "../../../data/mockTasks";
import { Button } from "../../common/Button";
import { Modal } from "../../common/Modal";
import { TaskForm } from "../TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      console.log(newTasks);
      return newTasks;
    });
  };

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2">
          Tasks List ({pendingTasksCount} Pending)
        </Typography>
        <Button onClick={handleOpenModal}>Add New Task</Button>
      </Box>

      <Box>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </Box>

      <Modal
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Add New Task"
      >
        <TaskForm handleClose={handleCloseModal} />
      </Modal>
    </Box>
  );
}
