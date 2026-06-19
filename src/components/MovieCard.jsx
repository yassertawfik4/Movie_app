import { memo } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import useGenreStore from "../store/useGenreStore";
import {
    posterUrl,
    posterGradient,
    monogram,
    ratingText,
    yearOf,
} from "../lib/movies";

const MovieCard = ({ movie }) => {
    const { inWishlist, toggleWishlist } = useWishlist(movie);
    const namesFor = useGenreStore((s) => s.namesFor);

    const img = posterUrl(movie.poster_path);

    // List endpoints carry genre_ids; full detail objects carry genres[].
    const genreNames = movie.genres?.length
        ? movie.genres.map((g) => g.name).slice(0, 2)
        : namesFor(movie.genre_ids || []);

    const year = yearOf(movie.release_date);
    const subParts = [];
    if (year && year !== "—") subParts.push(year);
    if (genreNames.length) subParts.push(genreNames.join(" · "));

    const onToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist();
    };

    return (
        <Link to={`/movie/${movie.id}`} className="mq-card">
            <div
                className="mq-poster"
                style={
                    img
                        ? { backgroundImage: `url(${img})` }
                        : { background: posterGradient(movie.id) }
                }
            >
                {img ? null : (
                    <span className="mq-poster-mono">
                        {monogram(movie.title)}
                    </span>
                )}
                <div className="mq-poster-overlay" />
                <button
                    type="button"
                    className="mq-heart-btn"
                    title="Wishlist"
                    onClick={onToggle}
                >
                    <Heart
                        size={17}
                        strokeWidth={2}
                        fill={inWishlist ? "var(--rose)" : "rgba(0,0,0,0.22)"}
                        color={inWishlist ? "var(--rose)" : "#fff"}
                    />
                </button>
                <span className="mq-rating">
                    <Star size={13} fill="var(--star)" stroke="none" />
                    {ratingText(movie.vote_average)}
                </span>
            </div>
            <div className="mq-card-title">{movie.title}</div>
            <div className="mq-card-sub">{subParts.join(" · ")}</div>
        </Link>
    );
};

// List item: skip re-render unless the movie reference changes. Wishlist state
// is sourced from a per-movie store subscription inside useWishlist, so toggles
// still update the heart without the parent re-rendering the whole grid.
export default memo(MovieCard);
