import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTasksByUserId,
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  updateTask as updateTaskApi,
} from "../../api/tasksService";

export const fetchTasksByUser = createAsyncThunk(
  "tasks/fetchByUser",
  async (userId, thunkApi) => {
    try {
      const data = await getTasksByUserId(userId);
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch tasks from the server.";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async ({ userId, taskData }, thunkApi) => {
    try {
      const payload = {
        ...taskData,
        userId,
        completed: false,
      };
      const created = await createTaskApi(payload);
      return created;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add new task.";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ taskId, updatedTask }, thunkApi) => {
    try {
      const updated = await updateTaskApi(taskId, updatedTask);
      return updated;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update task.";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, thunkApi) => {
    try {
      await deleteTaskApi(taskId);
      return taskId;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete task.";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleCompletion",
  async ({ taskId, currentStatus }, thunkApi) => {
    try {
      const updated = await updateTaskApi(taskId, {
        completed: !currentStatus,
      });
      return updated;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to toggle task completion.";
      return thunkApi.rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  searchTerm: "",
  createStatus: "idle",
  createError: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    clearCreateError(state) {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTasksByUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasksByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.slice().reverse();
      })
      .addCase(fetchTasksByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch tasks.";
      })

      .addCase(createTask.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || "Failed to add new task.";
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((t) =>
          t.id === updated.id ? updated : t
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload || "Failed to update task.";
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload.id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete task.";
      })

      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((t) =>
          t.id === updated.id ? updated : t
        );
      })
      .addCase(toggleTaskCompletion.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle task completion.";
      });
  },
});

export const { setSearchTerm, clearError, clearCreateError } =
  tasksSlice.actions;

export default tasksSlice.reducer;

export const selectTasks = (state) => state.tasks.items;
export const selectTasksStatus = (state) => state.tasks.status;
export const selectTasksError = (state) => state.tasks.error;
export const selectSearchTerm = (state) => state.tasks.searchTerm;

export const selectFilteredTasks = (state) => {
  const term = state.tasks.searchTerm.trim().toLowerCase();
  const items = state.tasks.items;
  if (!term) return items;

  return items.filter((task) => {
    const title = (task.title || "").toLowerCase();
    const desc = (task.description || "").toLowerCase();
    return title.includes(term) || desc.includes(term);
  });
};
