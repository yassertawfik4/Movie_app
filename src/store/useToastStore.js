import { create } from "zustand";

let nextId = 1;

const useToastStore = create((set, get) => ({
    toasts: [],

    show: (msg, kind = "ok") => {
        const id = nextId++;
        set((s) => ({ toasts: [...s.toasts, { id, msg, kind }] }));
        setTimeout(() => get().remove(id), 2600);
    },

    remove: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export default useToastStore;
