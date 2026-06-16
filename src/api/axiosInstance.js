import axios from "axios";

export const axiosMovieInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
