import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toaster from "./Toaster";
import TrailerModal from "./TrailerModal";
import useGenreStore from "../store/useGenreStore";

const Fallback = () => (
    <div
        style={{
            display: "flex",
            minHeight: "60vh",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--rose)] border-t-transparent" />
    </div>
);

const Layout = () => {
    const loadGenres = useGenreStore((s) => s.load);

    // Load the genre map once so cards everywhere can show genre names.
    useEffect(() => {
        loadGenres();
    }, [loadGenres]);

    return (
        <div className="mq-shell">
            <Navbar />

            <main className="mq-main">
                <Suspense fallback={<Fallback />}>
                    <Outlet />
                </Suspense>
            </main>

            <Footer />

            <Toaster />
            <TrailerModal />
        </div>
    );
};

export default Layout;
