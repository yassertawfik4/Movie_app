import useWishlistStore from "../store/useWishlistStore";
import useToastStore from "../store/useToastStore";

/**
 * Wishlist helper bound to a single movie.
 *
 * Subscribes to the *derived boolean* (`is this movie saved?`) rather than to
 * a stable store function — so the component re-renders exactly when this
 * movie's saved state flips, and never for unrelated wishlist changes.
 */
export const useWishlist = (movie) => {
    const id = movie?.id;
    const inWishlist = useWishlistStore((s) =>
        s.wishlist.some((m) => m.id === id),
    );
    const toggle = useWishlistStore((s) => s.toggleWishlist);
    const showToast = useToastStore((s) => s.show);

    const toggleWishlist = () => {
        if (!movie) return;
        toggle(movie);
        showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist");
    };

    return { inWishlist, toggleWishlist };
};

export default useWishlist;
