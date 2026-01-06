import { request } from "./apiClient";
const API_URL = "http://localhost:3001";

export async function loginUser(email, password) {
  const response = await request({
    method: "GET",
    url: `/users?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`,
  });
  if (Array.isArray(response.data) && response.data.length > 0) {
    return response.data[0];
  }
  const err = new Error("Invalid email or password");
  err.response = {
    status: 400,
    data: { message: "Invalid email or password" },
  };
  throw err;
}

export async function registerUser(userData) {
  const checkUser = await request({
    method: "GET",
    url: `/users?email=${encodeURIComponent(userData.email)}`,
  });
  if (Array.isArray(checkUser.data) && checkUser.data.length > 0) {
    const err = new Error("User already registered!");
    err.response = {
      status: 422,
      data: { message: "User already registered!" },
    };
    throw err;
  }
  return request({
    method: "POST",
    url: "/users",
    data: userData,
  });
}

export const findUserByEmail = async (email) => {
  const response = await request({
    method: "GET",
    url: `/users?email=${encodeURIComponent(email)}`,
  });

  return Array.isArray(response.data) && response.data.length > 0
    ? response.data[0]
    : null;
};

export const updatePassword = async (userId, newPassword) => {
  const response = await request({
    method: "PATCH",
    url: `/users/${userId}`,
    data: { password: newPassword },
  });
  return !!response.data;
};
