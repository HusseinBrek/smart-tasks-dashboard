import { request } from "./apiClient";

const API_URL = "http://localhost:3001";

export function getTasksByUserId(userId) {
  return request({
    method: "GET",
    url: `/tasks?userId=${userId}`,
  });
}

export function createTask(newTask) {
  return request({
    method: "POST",
    url: "/tasks",
    data: newTask,
  });
}

export function updateTask(taskId, updatedData) {
  return request({
    method: "PATCH",
    url: `/tasks/${taskId}`,
    data: updatedData,
  });
}

export function deleteTask(taskId) {
  return request({
    method: "DELETE",
    url: `/tasks/${taskId}`,
  });
}
