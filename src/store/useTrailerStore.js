import { create } from "zustand";


const useTrailerStore = create((set) => ({
    movie: null,
    open: (movie) => set({ movie }),
    close: () => set({ movie: null }),
}));

export default useTrailerStore;
