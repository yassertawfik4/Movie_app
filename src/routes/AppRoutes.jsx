import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";


const Home = lazy(() => import('../pages/Home'))
const MovieDetails = lazy(() => import('../pages/MovieDetails'))
const Wishlist = lazy(() => import('../pages/Wishlist'))
const SearchResults = lazy(() => import('../pages/SearchResults'))
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/:id' element={<MovieDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </Suspense>
    )
}
export default AppRoutes;