import axios from "axios";

const API_URL = "http://localhost:3001";

export async function getTasks() {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function createTask(newTask) {
  try {
    const response = await axios.post(`${API_URL}/tasks`, newTask);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

export async function updateTask(taskId, updatedTask) {
  try {
    const response = await axios.patch(
      `${API_URL}/tasks/${taskId}`,
      updatedTask
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
