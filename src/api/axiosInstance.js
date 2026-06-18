import axios from "axios";

export const axiosMovieInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-US",
  },
});

export const axiosAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


