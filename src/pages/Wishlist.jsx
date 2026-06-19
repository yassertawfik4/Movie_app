import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import useWishlistStore from "../store/useWishlistStore";
import MovieGrid from "../components/MovieGrid";
import EmptyState from "../components/EmptyState";

const Wishlist = () => {
    const navigate = useNavigate();
    const wishlist = useWishlistStore((s) => s.wishlist);

    const summary = wishlist.length
        ? `${wishlist.length} movie${wishlist.length === 1 ? "" : "s"} saved`
        : "Nothing saved yet";

    return (
        <section>
            <div style={{ marginBottom: 24 }}>
                <h2
                    style={{
                        fontSize: "clamp(26px,4vw,36px)",
                        fontWeight: 800,
                        letterSpacing: "-.025em",
                    }}
                >
                    My Wishlist
                </h2>
                <p className="mq-sub" style={{ marginTop: 4, fontSize: 15 }}>
                    {summary}
                </p>
            </div>

            {wishlist.length === 0 ? (
                <EmptyState
                    icon={Heart}
                    iconColor="var(--rose)"
                    title="Your wishlist is empty"
                    message="Tap the heart on any movie to save it here for later."
                    action={
                        <button
                            className="mq-btn"
                            style={{
                                marginTop: 22,
                                height: 46,
                                padding: "0 22px",
                                borderRadius: 12,
                                fontSize: 15,
                            }}
                            onClick={() => navigate("/")}
                        >
                            Browse movies
                        </button>
                    }
                />
            ) : (
                <MovieGrid movies={wishlist} />
            )}
        </section>
    );
};

export default Wishlist;
