import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Star, Heart } from "lucide-react";
import { discoverMovies } from "../api/moviesApi";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useWishlist } from "../hooks/useWishlist";
import useGenreStore from "../store/useGenreStore";
import useTrailerStore from "../store/useTrailerStore";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import GenreFilter from "../components/GenreFilter";
import SortDropdown from "../components/SortDropdown";
import {
    backdropUrl,
    backdropGradient,
    ratingText,
    yearOf,
} from "../lib/movies";

const SORT_OPTIONS = [
    { key: "popularity.desc", label: "Popularity" },
    { key: "vote_average.desc", label: "Top Rated" },
    { key: "primary_release_date.desc", label: "Newest" },
];

const FeaturedHero = ({ movie }) => {
    const navigate = useNavigate();
    const openTrailer = useTrailerStore((s) => s.open);
    const namesFor = useGenreStore((s) => s.namesFor);
    const { inWishlist, toggleWishlist } = useWishlist(movie);

    const bd = backdropUrl(movie.backdrop_path, "w1280");
    const genreText = namesFor(movie.genre_ids || []).join(" · ");

    return (
        <div
            className="mq-fade-up"
            style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                minHeight: "clamp(380px,52vw,520px)",
                display: "flex",
                alignItems: "flex-end",
                border: "1px solid var(--line)",
                marginBottom: 38,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: bd ? undefined : backdropGradient(movie.id),
                    backgroundImage: bd ? `url(${bd})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(120% 90% at 80% 10%,transparent,rgba(0,0,0,.2)),linear-gradient(0deg,rgba(8,8,10,.92) 4%,rgba(8,8,10,.55) 42%,rgba(8,8,10,.15) 78%)",
                }}
            />
            <div
                style={{
                    position: "relative",
                    padding: "clamp(24px,4vw,48px)",
                    maxWidth: 640,
                    color: "#fff",
                }}
            >
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: "#fff",
                        background: "var(--rose)",
                        padding: "6px 12px",
                        borderRadius: 8,
                    }}
                >
                    Now Playing
                </span>
                <h1
                    style={{
                        marginTop: 16,
                        fontSize: "clamp(34px,5.5vw,60px)",
                        lineHeight: 1.02,
                        letterSpacing: "-.03em",
                        fontWeight: 800,
                    }}
                >
                    {movie.title}
                </h1>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginTop: 14,
                        fontSize: 15,
                        color: "rgba(255,255,255,.82)",
                        flexWrap: "wrap",
                    }}
                >
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            color: "var(--star)",
                            fontWeight: 700,
                        }}
                    >
                        <Star size={16} fill="currentColor" stroke="none" />
                        {ratingText(movie.vote_average)}
                    </span>
                    <span>{yearOf(movie.release_date)}</span>
                    {genreText ? <span>{genreText}</span> : null}
                </div>
                <p
                    style={{
                        marginTop: 14,
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,.78)",
                        maxWidth: 540,
                    }}
                >
                    {movie.overview}
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        marginTop: 24,
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        className="mq-btn"
                        style={{
                            height: 48,
                            padding: "0 22px",
                            borderRadius: 13,
                            fontSize: 15,
                            fontWeight: 700,
                            background: "#fff",
                            color: "#0b0b0d",
                        }}
                        onClick={() => openTrailer(movie)}
                    >
                        <Play size={18} fill="currentColor" stroke="none" />
                        Watch Trailer
                    </button>
                    <button
                        className="mq-btn-glass"
                        style={{
                            height: 48,
                            padding: "0 22px",
                            borderRadius: 13,
                            fontSize: 15,
                        }}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                        View Details
                    </button>
                    <button
                        className="mq-btn-glass"
                        title="Wishlist"
                        style={{
                            width: 48,
                            height: 48,
                            padding: 0,
                            borderRadius: 13,
                        }}
                        onClick={toggleWishlist}
                    >
                        <Heart
                            size={20}
                            strokeWidth={2}
                            fill={inWishlist ? "var(--rose)" : "transparent"}
                            color={inWishlist ? "var(--rose)" : "#fff"}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const genres = useGenreStore((s) => s.genres);

    const [genre, setGenre] = useState("all");
    const [sort, setSort] = useState("popularity.desc");
    const [page, setPage] = useState(1);

    const { data, loading, error } = useFetchMovies(
        () =>
            discoverMovies({
                genre: genre === "all" ? undefined : genre,
                sortBy: sort,
                page,
            }),
        [genre, sort, page],
    );

    const movies = data?.results || [];
    const totalPages = data?.total_pages || 0;
    const featured = movies[0];

    const changeGenre = (g) => {
        setGenre(g);
        setPage(1);
    };
    const changeSort = (s) => {
        setSort(s);
        setPage(1);
    };
    const changePage = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section>
            {featured ? <FeaturedHero movie={featured} /> : null}

            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 16,
                    margin: "0 0 18px",
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <h2 className="mq-h2">Now Playing</h2>
                    <p className="mq-sub" style={{ marginTop: 3 }}>
                        Popular movies, fresh picks for you
                    </p>
                </div>
                <SortDropdown
                    value={sort}
                    onChange={changeSort}
                    options={SORT_OPTIONS}
                />
            </div>

            <div style={{ marginBottom: 22 }}>
                <GenreFilter
                    genres={genres}
                    active={genre}
                    onChange={changeGenre}
                />
            </div>

            {error ? (
                <p
                    style={{
                        padding: "60px 0",
                        textAlign: "center",
                        color: "var(--rose)",
                    }}
                >
                    Failed to load movies. Please try again.
                </p>
            ) : (
                <>
                    <MovieGrid movies={movies} loading={loading} />
                    {loading ? null : (
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={changePage}
                        />
                    )}
                </>
            )}
        </section>
    );
};

export default Home;
