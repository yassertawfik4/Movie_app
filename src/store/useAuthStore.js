import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

export const userDisplayName = (user) =>
    user?.user_metadata?.username ||
    user?.email?.split("@")[0] ||
    "Your Account";

export const userInitials = (user) => {
    const base = user?.user_metadata?.username || user?.email || "U";
    return base.slice(0, 2).toUpperCase();
};

export const useAuthStore = create((set) => ({
    user: null,
    session: null,
    isLoggedIn: false,
    initialized: false,

 
    init: () => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            set({
                session,
                user: session?.user ?? null,
                isLoggedIn: !!session,
            });
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            set({
                session,
                user: session?.user ?? null,
                isLoggedIn: !!session,
                initialized: true,
            });
        });

        return () => subscription.unsubscribe();
    },

    // Email + password sign in
    login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        set({
            session: data.session,
            user: data.user,
            isLoggedIn: !!data.session,
        });
        return data;
    },

    // Email + password sign up; username goes into user_metadata.
    // If email confirmation is enabled, data.session is null until confirmed.
    register: async (username, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username } },
        });
        if (error) throw error;
        if (data.session) {
            set({
                session: data.session,
                user: data.user,
                isLoggedIn: true,
            });
        }
        return data;
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ session: null, user: null, isLoggedIn: false });
    },
}));
