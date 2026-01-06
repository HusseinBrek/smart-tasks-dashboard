import { request } from "./apiClient";

export async function loginUser(email, password) {
  const users = await request({
    method: "GET",
    url: `/users?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`,
  });

  if (Array.isArray(users) && users.length > 0) {
    return users[0];
  }

  const err = new Error("Invalid email or password");
  err.response = {
    status: 400,
    data: { message: "Invalid email or password" },
  };
  throw err;
}

export async function registerUser(userData) {
  const existing = await request({
    method: "GET",
    url: `/users?email=${encodeURIComponent(userData.email)}`,
  });

  if (Array.isArray(existing) && existing.length > 0) {
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
  const users = await request({
    method: "GET",
    url: `/users?email=${encodeURIComponent(email)}`,
  });

  return Array.isArray(users) && users.length > 0 ? users[0] : null;
};

export const updatePassword = async (userId, newPassword) => {
  const updated = await request({
    method: "PATCH",
    url: `/users/${userId}`,
    data: { password: newPassword },
  });

  return !!updated;
};
