import { axiosInstance } from "./axiosInstance";

// login function

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/login", {
      username,
      password,
    });

    // store the token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// register function

export const register = async (username, password) => {
  try {
    const response = await axiosInstance.post("/register", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

// get current user function

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("no token found");
    }

    const response = await axiosInstance.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("failed to get user:", error);
    throw error;
  }
};

//logout function

export const logout = () => {
  localStorage.removeItem("token");
};
