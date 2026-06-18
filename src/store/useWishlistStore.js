import { persist } from "zustand/middleware";
import { create } from "zustand"; 

const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [],
            toggleWishlist: (movie) => {
                const exists = get().wishlist.find((m) => m.id === movie.id);
                if(exists){
                    set({wishlist:get().wishlist.filter((m) => m.id !== movie.id)})
                }else{
                    set({wishlist:[...get().wishlist,movie]});
                }
            },
            isInWishlist:(id)=>get().wishlist.some((m) => m.id === id)

        }),
            { name: "wishlist" }


    )
)
export default useWishlistStore; 