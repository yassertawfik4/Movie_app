import { useEffect } from "react";
import { X } from "lucide-react";
import useTrailerStore from "../store/useTrailerStore";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { getMovieVideos } from "../api/moviesApi";
import { backdropGradient } from "../lib/movies";

const pickTrailer = (videos = []) =>
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    videos.find((v) => v.site === "YouTube");

// Global trailer modal. Opens whenever a movie is set in the trailer store,
// fetches its YouTube key, and embeds the player.
const TrailerModal = () => {
    const movie = useTrailerStore((s) => s.movie);
    const close = useTrailerStore((s) => s.close);

    const { data, loading } = useFetchMovies(
        () => (movie ? getMovieVideos(movie.id) : Promise.resolve(null)),
        [movie?.id],
    );
    const videoKey = pickTrailer(data?.results)?.key || null;

    // Close on Escape
    useEffect(() => {
        if (!movie) return;
        const handle = (e) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    }, [movie, close]);

    if (!movie) return null;

    return (
        <div className="mq-modal-overlay" onClick={close}>
            <div className="mq-modal" onClick={(e) => e.stopPropagation()}>
                <div
                    style={{
                        position: "relative",
                        aspectRatio: "16/9",
                        background: backdropGradient(movie.id),
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    {videoKey ? (
                        <iframe
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                border: 0,
                            }}
                            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                            title={`${movie.title} — trailer`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : (
                        <div
                            style={{
                                position: "relative",
                                color: "#fff",
                                textAlign: "center",
                                padding: 24,
                                fontWeight: 600,
                            }}
                        >
                            {loading
                                ? "Loading trailer…"
                                : "No trailer available for this title."}
                        </div>
                    )}

                    <button
                        onClick={close}
                        title="Close"
                        style={{
                            position: "absolute",
                            top: 14,
                            right: 14,
                            width: 38,
                            height: 38,
                            borderRadius: 11,
                            border: "none",
                            background: "rgba(0,0,0,.45)",
                            backdropFilter: "blur(6px)",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                            zIndex: 2,
                        }}
                    >
                        <X size={19} color="#fff" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrailerModal;
