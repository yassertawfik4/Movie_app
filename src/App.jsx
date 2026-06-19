import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  // Subscribe to Supabase auth state + hydrate the persisted session once.
  useEffect(() => useAuthStore.getState().init(), []);

  return <AppRoutes />;
}

export default App;
