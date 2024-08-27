import axios from "axios";

const API_URL = "http://localhost:4002/api";

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const addUser = async (name: string, email: string) => {
  const response = await axios.post(`${API_URL}/users`, { name, email });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, name: string, email: string) => {
  const response = await axios.patch(`${API_URL}/users/${id}`, { name, email });
  return response.data;
};
