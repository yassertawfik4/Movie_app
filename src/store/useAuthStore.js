import { create } from "zustand";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  getCurrentUser,
} from "@/api/authApi";

export const useAuthStore = create((set) => ({
  // State — isLoggedIn is seeded from a persisted token so a refresh keeps the session
  user: null,
  isLoggedIn: !!localStorage.getItem("token"),

  // Log in, then try to load the current user profile
  login: async (email, password) => {
    const data = await loginApi(email, password);
    try {
      const user = await getCurrentUser();
      set({ user, isLoggedIn: true });
    } catch {
      // Token was stored by loginApi even if /me isn't available
      set({ isLoggedIn: !!localStorage.getItem("token") });
    }
    return data;
  },

  // Register a new account (auto-logs-in if the API returns a token)
  register: async (firstName, email, password) => {
    const data = await registerApi(firstName, email, password);
    if (localStorage.getItem("token")) {
      set({ isLoggedIn: true });
    }
    return data;
  },

  // Clear the session
  logout: () => {
    logoutApi();
    set({ user: null, isLoggedIn: false });
  },

  // Re-hydrate the user from the token (e.g. on app start)
  fetchUser: async () => {
    try {
      const user = await getCurrentUser();
      set({ user, isLoggedIn: true });
      return user;
    } catch {
      set({ user: null, isLoggedIn: false });
      return null;
    }
  },
}));
