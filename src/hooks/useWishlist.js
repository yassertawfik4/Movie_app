import useWishlistStore from "../store/useWishlistStore";
import useToastStore from "../store/useToastStore";
import { useAuthStore } from "../store/useAuthStore";

export const useWishlist = (movie) => {
    const id = movie?.id;
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    const inWishlist = useWishlistStore((s) =>
        s.wishlist.some((m) => m.id === id),
    );
    const toggle = useWishlistStore((s) => s.toggleWishlist);
    const showToast = useToastStore((s) => s.show);

    const toggleWishlist = () => {
        if (!movie) return;
        if (!isLoggedIn) {
            showToast("Sign in to save movies to your wishlist", "error");
            return;
        }
        toggle(movie);
        showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist");
    };

    return { inWishlist, toggleWishlist };
};

export default useWishlist;
