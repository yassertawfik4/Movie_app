import { useNavigate } from "react-router-dom";
import { LogOut, UserRound } from "lucide-react";
import {
    useAuthStore,
    userDisplayName,
    userInitials,
} from "../store/useAuthStore";
import useWishlistStore from "../store/useWishlistStore";
import useToastStore from "../store/useToastStore";
import EmptyState from "../components/EmptyState";

const Account = () => {
    const navigate = useNavigate();
    const user = useAuthStore((s) => s.user);
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    const logout = useAuthStore((s) => s.logout);
    const wishlistCount = useWishlistStore((s) => s.wishlist.length);
    const showToast = useToastStore((s) => s.show);

    if (!isLoggedIn) {
        return (
            <section>
                <EmptyState
                    icon={UserRound}
                    title="You're not signed in"
                    message="This area is protected. Please log in to continue."
                    action={
                        <button
                            className="mq-btn"
                            style={{
                                marginTop: 22,
                                height: 46,
                                padding: "0 24px",
                                borderRadius: 12,
                                fontSize: 15,
                            }}
                            onClick={() => navigate("/login")}
                        >
                            Sign in
                        </button>
                    }
                />
            </section>
        );
    }

    const displayName = userDisplayName(user);
    const email = user?.email || "—";
    const initials = userInitials(user);
    const memberSince = user?.created_at
        ? new Date(user.created_at).getFullYear()
        : "—";

    const onLogout = async () => {
        await logout();
        showToast("Signed out");
        navigate("/");
    };

    return (
        <section style={{ maxWidth: 560, margin: "0 auto" }}>
            <div
                className="mq-fade-up"
                style={{
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 22,
                    padding: "clamp(24px,4vw,38px)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 18,
                    }}
                >
                    <div
                        style={{
                            width: 74,
                            height: 74,
                            borderRadius: "50%",
                            background: "var(--rose)",
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 27,
                            fontWeight: 700,
                            flex: "0 0 74px",
                        }}
                    >
                        {initials}
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <h1
                            style={{
                                fontSize: 25,
                                fontWeight: 800,
                                letterSpacing: "-.02em",
                            }}
                        >
                            {displayName}
                        </h1>
                        <p className="mq-sub" style={{ marginTop: 3 }}>
                            {email}
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        marginTop: 26,
                    }}
                >
                    <div
                        style={{
                            background: "var(--surface-2)",
                            borderRadius: 14,
                            padding: 18,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 30,
                                fontWeight: 800,
                                color: "var(--rose)",
                            }}
                        >
                            {wishlistCount}
                        </div>
                        <div className="mq-sub" style={{ marginTop: 2 }}>
                            Saved movies
                        </div>
                    </div>
                    <div
                        style={{
                            background: "var(--surface-2)",
                            borderRadius: 14,
                            padding: 18,
                        }}
                    >
                        <div style={{ fontSize: 30, fontWeight: 800 }}>
                            {memberSince}
                        </div>
                        <div className="mq-sub" style={{ marginTop: 2 }}>
                            Member since
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        marginTop: 24,
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        className="mq-btn-outline"
                        style={{
                            flex: 1,
                            minWidth: 150,
                            height: 46,
                            borderRadius: 12,
                            fontSize: 14.5,
                            background: "var(--surface-2)",
                        }}
                        onClick={() => navigate("/wishlist")}
                    >
                        View Wishlist
                    </button>
                    <button
                        className="mq-btn-rose"
                        style={{
                            flex: 1,
                            minWidth: 150,
                            height: 46,
                            borderRadius: 12,
                            fontSize: 14.5,
                        }}
                        onClick={onLogout}
                    >
                        <LogOut size={17} />
                        Log out
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Account;
