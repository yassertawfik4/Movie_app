import { useEffect, useState } from "react";

/**
 * Generic data-fetching hook for the TMDB API helpers.
 *
 * Centralizes the loading / error / "ignore stale response" logic that would
 * otherwise be duplicated in every page. `fetcher` is run whenever `deps`
 * change; results from a superseded request are discarded.
 *
 * @param {() => Promise<any>} fetcher  Returns the promise to await.
 * @param {Array} deps                  Re-run the fetch when these change.
 */
export const useFetchMovies = (fetcher, deps = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;

        // Synchronous reset is the intended data-fetching pattern; the lint
        // rule targets state syncing, not request kickoff.
        /* eslint-disable react-hooks/set-state-in-effect */
        setLoading(true);
        setError(null);
        /* eslint-enable react-hooks/set-state-in-effect */

        Promise.resolve()
            .then(fetcher)
            .then((result) => {
                if (active) setData(result);
            })
            .catch((err) => {
                if (active) setError(err);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
};

export default useFetchMovies;
