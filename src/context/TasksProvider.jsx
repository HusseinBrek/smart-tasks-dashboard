import { useCallback, useEffect, useMemo, useState } from "react";
import { TasksContext } from "./TasksContext";
import {
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask as apiDeleteTask,
} from "../api/tasksService";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();

  const filteredTasks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return tasks;
    return tasks.filter((task) => {
      const title = (task.title || "").toLowerCase();
      const desc = (task.description || "").toLowerCase();
      return title.includes(term) || desc.includes(term);
    });
  }, [tasks, searchTerm]);

  const fetchTask = useCallback(async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTasksByUserId(user.id);
      setTasks(data.reverse());
    } catch (err) {
      console.error("Fetch Tasks Error:", err);
      setError(
        "Failed to fetch tasks from the server. Please check the API connection."
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const addNewTask = async (taskData) => {
    if (!user) return false;
    try {
      const newTaskWithAuth = {
        ...taskData,
        userId: user.id,
        completed: false,
      };
      const data = await createTask(newTaskWithAuth);
      setTasks((prev) => [data, ...prev]);
      toast.success("Task added to your list!");
      return true;
    } catch (err) {
      console.error("Create Task Error:", err);
      toast.error("Failed to add new task.");
      return false;
    }
  };

  const editTask = async (taskId, updatedData) => {
    try {
      const data = await updateTask(taskId, updatedData);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? data : task))
      );
      toast.success("Task updated successfully!");
      return true;
    } catch (err) {
      console.error("Update Task Error:", err);
      toast.error("Failed to update task.");
      return false;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await apiDeleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully!");
      return true;
    } catch (err) {
      console.error("Delete Task Error:", err);
      toast.error("Failed to delete task.");
      return false;
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    return await editTask(taskId, { completed: !currentStatus });
  };
  const contextValue = {
    tasks,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    addNewTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    isLoading,
    error,
  };
  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};
