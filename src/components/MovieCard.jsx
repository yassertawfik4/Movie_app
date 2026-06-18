import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import useWishlistStore from "../store/useWishlistStore";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
    const toggleWishlist = useWishlistStore(
        (state) => state.toggleWishlist
    );

    const isInWishlist = useWishlistStore(
        (state) => state.isInWishlist
    );

    const inWishlist = isInWishlist(movie.id);

    return (
        <Link to={`/movie/${movie.id}`}>
            <div
                className="
          relative
          overflow-hidden
          rounded-xl
          bg-gray-900
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl
          group
        "
            >
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 z-20">
                    <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-md">
                        ⭐ {movie.vote_average?.toFixed(1)}
                    </span>
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(movie);
                    }}
                    className="
            absolute
            top-3
            right-3
            z-20
            bg-black/50
            p-2
            rounded-full
            hover:bg-black/80
            transition
          "
                >
                    <Heart
                        size={20}
                        className={
                            inWishlist
                                ? "fill-red-500 text-red-500"
                                : "text-white"
                        }
                    />
                </button>

                {/* Poster */}
                <div className="relative">
                    <img
                        src={
                            movie.poster_path
                                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Image"
                        }
                        alt={movie.title}
                        className="w-full h-80 object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-4">
                    <h3 className="text-white font-semibold text-lg truncate">
                        {movie.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                        {movie.release_date?.split("-")[0] || "N/A"}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;