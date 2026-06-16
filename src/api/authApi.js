// login function

import { axiosAuthInstance } from "./axiosInstance";

export const login = async (email, password) => {
  try {
    const response = await axiosAuthInstance.post("/login", {
      email,
      password,
    });
    console.log("Login successful:", response.data.accessToken);
    // store the token in localStorage
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// register function

export const register = async (firstName, email, password) => {
  try {
    const response = await axiosAuthInstance.post("/register", {
      firstName,
      email,
      password,
    });
    console.log("Registration successful:", response.data);
    // store the token in localStorage (auto-login after registering)
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    console.error("registration failed:", error);
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

    const response = await axiosAuthInstance.get("/me", {
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
