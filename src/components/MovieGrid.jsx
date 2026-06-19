import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";

const MovieGrid = ({
    movies = [],
    loading = false,
    skeletonCount = 10,
    empty,
}) => {
    if (loading) {
        return (
            <div className="mq-grid">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (!movies.length) {
        return (
            empty || (
                <EmptyState
                    title="No movies found"
                    message="We couldn't find any movies to show right now."
                />
            )
        );
    }

    return (
        <div className="mq-grid">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieGrid;
