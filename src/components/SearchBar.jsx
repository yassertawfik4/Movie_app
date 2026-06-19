import { useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

// Compact search box used in the navbar. Navigates to /search?q= on submit.
const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();

    const urlQuery = location.pathname === "/search" ? params.get("q") || "" : "";
    const [value, setValue] = useState(urlQuery);

    // Keep the input in sync with the URL while on the search page, without an
    // effect: adjust state during render when the tracked value changes.
    const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
    if (urlQuery !== prevUrlQuery) {
        setPrevUrlQuery(urlQuery);
        setValue(urlQuery);
    }

    const submit = (e) => {
        e.preventDefault();
        const q = value.trim();
        navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    };

    return (
        <form onSubmit={submit} className="mq-search">
            <Search
                size={17}
                color="var(--text-3)"
                style={{ flex: "0 0 auto" }}
            />
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search movies…"
            />
        </form>
    );
};

export default SearchBar;
