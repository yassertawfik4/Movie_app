const GenreFilter = ({ genres = [], active = "all", onChange }) => {
    return (
        <div className="mq-chip-row">
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
