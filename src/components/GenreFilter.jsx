import { useRef, useCallback } from "react";

const GenreFilter = ({ genres = [], active = "all", onChange }) => {
    const rowRef = useRef(null);
    const dragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const scrollBy = useCallback((dir) => {
        rowRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }, []);

    const onMouseDown = useCallback((e) => {
        dragging.current = true;
        startX.current = e.pageX - rowRef.current.offsetLeft;
        scrollLeft.current = rowRef.current.scrollLeft;
        rowRef.current.style.cursor = "grabbing";
    }, []);

    const onMouseUp = useCallback(() => {
        if (!dragging.current) return;
        dragging.current = false;
        rowRef.current.style.cursor = "grab";
    }, []);

    const onMouseMove = useCallback((e) => {
        if (!dragging.current) return;
        e.preventDefault();
        const x = e.pageX - rowRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        rowRef.current.scrollLeft = scrollLeft.current - walk;
    }, []);

    const onMouseLeave = useCallback(() => {
        if (dragging.current) {
            dragging.current = false;
            rowRef.current.style.cursor = "grab";
        }
    }, []);

    const onKeyDown = useCallback((e) => {
        if (e.key === "ArrowRight") scrollBy(1);
        else if (e.key === "ArrowLeft") scrollBy(-1);
    }, [scrollBy]);

    return (
        <div
            className="mq-chip-row"
            role="region"
            aria-label="Filter by genre"
            ref={rowRef}
            tabIndex={0}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onKeyDown={onKeyDown}
        >
            <button
                className={`mq-chip ${active === "all" ? "is-active" : ""}`}
                onClick={() => onChange("all")}
            >
                All
            </button>
            {genres.map((g) => (
                <button
                    key={g.id}
                    className={`mq-chip ${active === g.id ? "is-active" : ""}`}
                    onClick={() => onChange(g.id)}
                >
                    {g.name}
                </button>
            ))}
        </div>
    );
};

export default GenreFilter;
