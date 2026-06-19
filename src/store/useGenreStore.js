import { create } from "zustand";
import { getGenres } from "../api/moviesApi";

const useGenreStore = create((set, get) => ({
    genres: [],
    map: {},
    loaded: false,
    loading: false,

    load: async () => {
        const { loaded, loading } = get();
        if (loaded || loading) return;
        set({ loading: true });
        try {
            const data = await getGenres();
            const genres = data.genres || [];
            const map = {};
            genres.forEach((g) => {
                map[g.id] = g.name;
            });
            set({ genres, map, loaded: true, loading: false });
        } catch {
            set({ loading: false });
        }
    },

    namesFor: (ids = [], limit = 2) =>
        ids
            .map((id) => get().map[id])
            .filter(Boolean)
            .slice(0, limit),
}));

export default useGenreStore;
