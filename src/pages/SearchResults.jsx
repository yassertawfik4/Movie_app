import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SearchX } from "lucide-react";
import { searchMovies, discoverMovies } from "../api/moviesApi";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useDebounce } from "../hooks/useDebounce";
import useGenreStore from "../store/useGenreStore";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import GenreFilter from "../components/GenreFilter";
import SortDropdown from "../components/SortDropdown";
import EmptyState from "../components/EmptyState";

const SORT_OPTIONS = [
    { key: "popularity", label: "Popularity" },
    { key: "vote", label: "Top Rated" },
    { key: "release", label: "Newest" },
];

const sortMovies = (list, sort) => {
    const a = [...list];
    if (sort === "popularity")
        a.sort((x, y) => (y.popularity || 0) - (x.popularity || 0));
    else if (sort === "vote")
        a.sort((x, y) => (y.vote_average || 0) - (x.vote_average || 0));
    else if (sort === "release")
        a.sort((x, y) =>
            (y.release_date || "").localeCompare(x.release_date || ""),
        );
    return a;
};

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get("q") || "";

    const genres = useGenreStore((s) => s.genres);

    // The input is seeded from the URL but is the live source for searching
    // (debounced) — no per-keystroke navigation or URL churn.
    const [input, setInput] = useState(urlQuery);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState("all");
    const [sort, setSort] = useState("popularity");

    // Re-seed the input when the URL query changes (e.g. navbar search) —
    // adjusted during render rather than in an effect.
    const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
    if (urlQuery !== prevUrlQuery) {
        setPrevUrlQuery(urlQuery);
        setInput(urlQuery);
    }

    const term = useDebounce(input, 400).trim();

    // Reset to page 1 whenever the (debounced) search term changes.
    const [prevTerm, setPrevTerm] = useState(term);
    if (term !== prevTerm) {
        setPrevTerm(term);
        setPage(1);
    }

    const { data, loading, error } = useFetchMovies(
        () =>
            term
                ? searchMovies(term, page)
                : discoverMovies({ sortBy: "popularity.desc", page }),
        [term, page],
    );

    const totalPages = data?.total_pages || 0;

    // Genre filter + sort applied client-side to the current page.
    const visible = useMemo(() => {
        let list = data?.results || [];
        if (genre !== "all")
            list = list.filter((m) => (m.genre_ids || []).includes(genre));
        return sortMovies(list, sort);
    }, [data, genre, sort]);

    const changePage = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const summary = term
        ? `${visible.length} result${visible.length === 1 ? "" : "s"} for “${term}”`
        : "Browsing popular movies";

    return (
        <section>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    height: 60,
                    padding: "0 20px",
                    borderRadius: 17,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    boxShadow: "0 10px 30px -16px rgba(0,0,0,.4)",
                    maxWidth: 640,
                    margin: "8px auto 32px",
                }}
            >
                <Search size={22} color="var(--text-3)" />
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for a movie…"
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        color: "var(--text)",
                        fontSize: 19,
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    marginBottom: 18,
                    flexWrap: "wrap",
                }}
            >
                <div style={{ flex: 1, minWidth: 0 }}>
                    <GenreFilter
                        genres={genres}
                        active={genre}
                        onChange={setGenre}
                    />
                </div>
                <SortDropdown
                    value={sort}
                    onChange={setSort}
                    options={SORT_OPTIONS}
                />
            </div>

            <p className="mq-sub" style={{ marginBottom: 20 }}>
                {summary}
            </p>

            {error ? (
                <p
                    style={{
                        padding: "60px 0",
                        textAlign: "center",
                        color: "var(--rose)",
                    }}
                >
                    Search failed. Please try again.
                </p>
            ) : (
                <>
                    <MovieGrid
                        movies={visible}
                        loading={loading}
                        empty={
                            <EmptyState
                                icon={SearchX}
                                title="No movies found"
                                message="We couldn't find anything matching your search. Try a different title."
                            />
                        }
                    />
                    {!loading && genre === "all" ? (
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={changePage}
                        />
                    ) : null}
                </>
            )}
        </section>
    );
};

export default SearchResults;
