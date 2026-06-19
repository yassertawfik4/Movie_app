import { Link, NavLink } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkModeToggle";
import useWishlistStore from "../store/useWishlistStore";
import { useAuthStore, userInitials } from "../store/useAuthStore";

const linkClass = ({ isActive }) => `mq-navlink ${isActive ? "is-active" : ""}`;

const Navbar = () => {
    const wishlistCount = useWishlistStore((s) => s.wishlist.length);
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    const user = useAuthStore((s) => s.user);

    const initials = userInitials(user);

    return (
        <header className="mq-header">
            <div className="mq-nav-inner">
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        textDecoration: "none",
                        color: "var(--text)",
                        flex: "0 0 auto",
                    }}
                >
                    <span className="mq-brand-badge">
                        <Clapperboard size={19} color="#fff" strokeWidth={2} />
                    </span>
                    <span
                        style={{
                            fontWeight: 800,
                            fontSize: 19,
                            letterSpacing: ".16em",
                        }}
                    >
                        MARQUEE
                    </span>
                </Link>

                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flex: "0 0 auto",
                    }}
                >
                    <NavLink to="/" end className={linkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/search" className={linkClass}>
                        Browse
                    </NavLink>
                    <NavLink to="/wishlist" className={linkClass}>
                        Wishlist
                        {wishlistCount > 0 && (
                            <span className="mq-badge">{wishlistCount}</span>
                        )}
                    </NavLink>
                </nav>

                <div
                    style={{
                        flex: "1 1 auto",
                        display: "flex",
                        justifyContent: "flex-end",
                        minWidth: 0,
                    }}
                >
                    <SearchBar />
                </div>

                <DarkModeToggle />

                {isLoggedIn ? (
                    <Link
                        to="/account"
                        className="mq-avatar"
                        title="Account"
                        style={{
                            display: "grid",
                            placeItems: "center",
                            textDecoration: "none",
                        }}
                    >
                        {initials}
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="mq-btn"
                        style={{
                            height: 42,
                            padding: "0 18px",
                            borderRadius: 12,
                            fontSize: 14.5,
                            textDecoration: "none",
                            flex: "0 0 auto",
                        }}
                    >
                        Sign in
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;
