
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const posterUrl = (path, size = "w500") =>
    path ? `${IMAGE_BASE}/${size}${path}` : null;

export const backdropUrl = (path, size = "w1280") =>
    path ? `${IMAGE_BASE}/${size}${path}` : null;

export const hueFromId = (id) => Math.abs(Number(id) || 0) % 360;

export const monogram = (title = "") =>
    title.replace(/^The\s+/i, "").charAt(0).toUpperCase() || "?";

export const posterGradient = (id) => {
    const h = hueFromId(id);
    return `linear-gradient(155deg, oklch(0.62 0.17 ${h}), oklch(0.30 0.14 ${
        (h + 45) % 360
    }))`;
};

export const backdropGradient = (id) => {
    const h = hueFromId(id);
    return `linear-gradient(115deg, oklch(0.40 0.15 ${h}), oklch(0.16 0.07 ${
        (h + 55) % 360
    }))`;
};

export const ratingText = (vote) =>
    typeof vote === "number" ? vote.toFixed(1) : "—";

export const yearOf = (date) => (date ? String(date).slice(0, 4) : "—");

export const formatRuntime = (min) => {
    if (!min || min <= 0) return "";
    return `${Math.floor(min / 60)}h ${min % 60}m`;
};

