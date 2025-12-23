import axios from "axios";
const API_URL = "http://localhost:3001";

export async function loginUser(email, password) {
  const response = await axios.get(
    `${API_URL}/users?email=${email}&password=${password}`
  );
  if (response.data.length > 0) {
    return response.data[0];
  }
  throw new Error("Invalid email or password");
}

export async function registerUser(userData) {
  const checkUser = await axios.get(`${API_URL}/users?email=${userData.email}`);
  if (checkUser.data.length > 0) {
    throw new Error("User already registered!");
  }
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
}

export const findUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}/users?email=${email}`);
  const users = await response.json();
  return users.length > 0 ? users[0] : null;
};

export const updatePassword = async (userId, newPassword) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newPassword }),
  });
  return response.ok;
};
