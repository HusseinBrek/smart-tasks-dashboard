import { useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

export default function TaskForm({ handleClose, taskToEdit = null, onSave }) {
  const initialData = taskToEdit || {
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  };

  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError((prev) => ({ ...prev, title: "Please enter a task title" }));
      return;
    }

    if (onSave) onSave(formData);

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    });
    if (handleClose) handleClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Input
        label="Task Title *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={error.title}
        helperText={error.title}
      />

      <Input
        label="Task Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
      />

      <Input
        label="Task Priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        select
      >
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </Input>

      <Input
        label="Due Date"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
        inputProps={{ min: today }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {taskToEdit ? "Update Task" : "Save Task"}
        </Button>
      </Box>
    </Box>
  );
}
