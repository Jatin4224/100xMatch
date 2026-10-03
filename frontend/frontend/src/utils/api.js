import axios from "axios";
import { BASE_URL } from "./constants";

// every request sends the auth cookie
const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

export const getErrorMessage = (err) =>
  err?.response?.data?.message || err?.message || "Something went wrong";

export default api;
