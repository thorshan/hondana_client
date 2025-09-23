import axios from "axios";

// Base URLs
const BASE_URL = "https://hondana.onrender.com/api";

// Auth APIs
export const loginUserAPI = (credentials) =>
  axios.post(`${BASE_URL}/auth/login`, credentials).then(res => res.data);

export const registerUserAPI = (userData) =>
  axios.post(`${BASE_URL}/users`, userData).then(res => res.data);

// User CRUD (admin purposes)
export const getUsers = () => axios.get(`${BASE_URL}/users`).then(res => res.data);
export const getUserById = (id) => axios.get(`${BASE_URL}/users/${id}`).then(res => res.data);
export const createUser = (data) => axios.post(`${BASE_URL}/users`, data).then(res => res.data);
export const updateUser = (id, data) => axios.put(`${BASE_URL}/users/${id}`, data).then(res => res.data);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/users/${id}`).then(res => res.data);
