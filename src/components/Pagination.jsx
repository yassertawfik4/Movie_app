import { ChevronLeft, ChevronRight } from "lucide-react";

// Build a compact page list: 1 … (p-1) p (p+1) … last
const buildPages = (page, max) => {
    const wanted = new Set([1, max, page, page - 1, page + 1]);
    const list = [...wanted]
        .filter((p) => p >= 1 && p <= max)
        .sort((a, b) => a - b);
    const out = [];
    let prev = 0;
    for (const p of list) {
        if (p - prev > 1) out.push("…");
        out.push(p);
        prev = p;
    }
    return out;
};

const Pagination = ({ page, totalPages, onPageChange }) => {
    const max = Math.min(totalPages || 1, 500); // TMDB caps usable pages at 500
    if (max <= 1) return null;

    const go = (p) => {
        const clamped = Math.max(1, Math.min(p, max));
        if (clamped !== page) onPageChange(clamped);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 38,
                flexWrap: "wrap",
            }}
        >
            <button
                className="mq-page-btn"
                disabled={page <= 1}
                onClick={() => go(page - 1)}
                aria-label="Previous page"
            >
                <ChevronLeft size={17} />
            </button>

            {buildPages(page, max).map((p, i) =>
                p === "…" ? (
                    <span
                        key={`gap-${i}`}
                        style={{ color: "var(--text-3)", padding: "0 4px" }}
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        className={`mq-page-btn ${p === page ? "is-active" : ""}`}
                        onClick={() => go(p)}
                    >
                        {p}
                    </button>
                ),
            )}

            <button
                className="mq-page-btn"
                disabled={page >= max}
                onClick={() => go(page + 1)}
                aria-label="Next page"
            >
                <ChevronRight size={17} />
            </button>
        </div>
    );
};

export default Pagination;
