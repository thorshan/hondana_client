import api from "./axiosInstance";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const register = async (userInfo) => {
  const { data } = await api.post("/auth/register", userInfo);
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
