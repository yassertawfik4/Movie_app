import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

const Home = lazy(() => import("../pages/Home"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const SearchResults = lazy(() => import("../pages/SearchResults"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Account = lazy(() => import("../pages/Account"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Every screen lives inside the Layout (navbar + footer + toaster + trailer
// modal). Layout provides its own Suspense boundary around the routed page.
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
