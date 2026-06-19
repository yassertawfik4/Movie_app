
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, Play, Heart } from "lucide-react";
import { getMoviesDetails, getRecommendations } from "../api/moviesApi";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useWishlist } from "../hooks/useWishlist";
import useTrailerStore from "../store/useTrailerStore";
import MovieGrid from "../components/MovieGrid";
import {
    posterUrl,
    posterGradient,
    backdropUrl,
    backdropGradient,
    monogram,
    ratingText,
    yearOf,
    formatRuntime,
} from "../lib/movies";

const Spinner = () => (
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

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const openTrailer = useTrailerStore((s) => s.open);

    const { data, loading, error } = useFetchMovies(
        () => Promise.all([getMoviesDetails(id), getRecommendations(id)]),
        [id],
    );

    const movie = data?.[0] || null;
    const recs = data?.[1]?.results || [];
    const { inWishlist, toggleWishlist } = useWishlist(movie);

    // Scroll to top when navigating between movie.
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [id]);

    if (loading) return <Spinner />;

    if (error || !movie) {
        return (
            <div
                style={{
                    display: "flex",
                    minHeight: "60vh",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                }}
            >
                <p style={{ color: "var(--rose)" }}>
                    {error ? "Failed to load this movie." : "Movie not found."}
                </p>
                <Link
                    to="/"
                    className="mq-btn"
                    style={{
                        height: 46,
                        padding: "0 22px",
                        borderRadius: 12,
                        textDecoration: "none",
                    }}
                >
                    Back home
                </Link>
            </div>
        );
    }

    const bd = backdropUrl(movie.backdrop_path, "w1280");
    const poster = posterUrl(movie.poster_path);
    const director = movie.credits?.crew?.find((c) => c.job === "Director");
    const cast = (movie.credits?.cast || []).slice(0, 3).map((c) => c.name);
    const runtime = formatRuntime(movie.runtime);

    return (
        <section>
            <button
                className="mq-btn-outline"
                style={{
                    height: 40,
                    padding: "0 14px 0 10px",
                    borderRadius: 11,
                    fontSize: 14,
                    color: "var(--text-2)",
                    marginBottom: 22,
                }}
                onClick={() => navigate(-1)}
            >
                <ArrowLeft size={18} />
                Back
            </button>

            {/* Hero */}
            <div
                className="mq-fade-up"
                style={{
                    position: "relative",
                    borderRadius: 24,
                    overflow: "hidden",
                    border: "1px solid var(--line)",
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
                            "linear-gradient(0deg,rgba(8,8,10,.94),rgba(8,8,10,.6) 60%,rgba(8,8,10,.4))",
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        gap: "clamp(20px,4vw,40px)",
                        padding: "clamp(22px,4vw,44px)",
                        flexWrap: "wrap",
                        color: "#fff",
                    }}
                >
                    {/* Poster */}
                    <div style={{ flex: "0 0 auto", width: "clamp(160px,30vw,230px)" }}>
                        <div
                            className="mq-poster"
                            style={{
                                border: "1px solid rgba(255,255,255,.16)",
                                boxShadow: "0 24px 60px -20px rgba(0,0,0,.7)",
                                ...(poster
                                    ? { backgroundImage: `url(${poster})` }
                                    : { background: posterGradient(movie.id) }),
                            }}
                        >
                            {poster ? null : (
                                <span className="mq-poster-mono">
                                    {monogram(movie.title)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div style={{ flex: "1 1 340px", minWidth: 260 }}>
                        <h1
                            style={{
                                fontSize: "clamp(30px,4.5vw,48px)",
                                lineHeight: 1.04,
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
                                <Star
                                    size={16}
                                    fill="currentColor"
                                    stroke="none"
                                />
                                {ratingText(movie.vote_average)}
                            </span>
                            <span>{yearOf(movie.release_date)}</span>
                            {runtime ? <span>{runtime}</span> : null}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                marginTop: 14,
                                flexWrap: "wrap",
                            }}
                        >
                            {(movie.genres || []).map((g) => (
                                <span
                                    key={g.id}
                                    style={{
                                        fontSize: 12.5,
                                        fontWeight: 600,
                                        color: "#fff",
                                        background: "rgba(255,255,255,.12)",
                                        border: "1px solid rgba(255,255,255,.18)",
                                        padding: "5px 11px",
                                        borderRadius: 9,
                                    }}
                                >
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <p
                            style={{
                                marginTop: 18,
                                fontSize: 16.5,
                                lineHeight: 1.65,
                                color: "rgba(255,255,255,.86)",
                                maxWidth: 620,
                            }}
                        >
                            {movie.overview || "No overview available."}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: 34,
                                marginTop: 20,
                                flexWrap: "wrap",
                            }}
                        >
                            {director ? (
                                <div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            letterSpacing: ".06em",
                                            textTransform: "uppercase",
                                            color: "rgba(255,255,255,.5)",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Director
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            marginTop: 4,
                                        }}
                                    >
                                        {director.name}
                                    </div>
                                </div>
                            ) : null}
                            {cast.length > 0 ? (
                                <div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            letterSpacing: ".06em",
                                            textTransform: "uppercase",
                                            color: "rgba(255,255,255,.5)",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Starring
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            marginTop: 4,
                                        }}
                                    >
                                        {cast.join(", ")}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                marginTop: 26,
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                className="mq-btn"
                                style={{
                                    height: 50,
                                    padding: "0 24px",
                                    borderRadius: 13,
                                    fontSize: 15,
                                    fontWeight: 700,
                                    background: "#fff",
                                    color: "#0b0b0d",
                                }}
                                onClick={() => openTrailer(movie)}
                            >
                                <Play
                                    size={18}
                                    fill="currentColor"
                                    stroke="none"
                                />
                                Watch Trailer
                            </button>
                            <button
                                className="mq-btn-glass"
                                style={{
                                    height: 50,
                                    padding: "0 22px",
                                    borderRadius: 13,
                                    fontSize: 15,
                                }}
                                onClick={toggleWishlist}
                            >
                                <Heart
                                    size={19}
                                    strokeWidth={2}
                                    fill={inWishlist ? "var(--rose)" : "transparent"}
                                    color={inWishlist ? "var(--rose)" : "#fff"}
                                />
                                {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {recs.length > 0 ? (
                <>
                    <h2 className="mq-h2" style={{ margin: "40px 0 18px" }}>
                        You might also like
                    </h2>
                    <MovieGrid movies={recs} />
                </>
            ) : null}
        </section>
    );
};

export default MovieDetails;
