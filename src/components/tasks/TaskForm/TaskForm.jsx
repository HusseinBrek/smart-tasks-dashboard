import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { useState } from "react";
import { Box } from "@mui/material";
import { MenuItem } from "@mui/material";

export default function TaskForm() {
  const initialFormState = {
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClose = () => {
    setFormData(initialFormState);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    handleClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Input
        label="Task Name"
        name="title"
        value={formData.title}
        onChange={handleChange}
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
        label="Task Due Date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <Box>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
}
