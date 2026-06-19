import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const SortDropdown = ({ value, onChange, options = [] }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handle = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    const current = options.find((o) => o.key === value) || options[0];

    return (
        <div ref={ref} style={{ position: "relative" }}>
            <button className="mq-sort-btn" onClick={() => setOpen((o) => !o)}>
                <span style={{ color: "var(--text-3)", fontWeight: 500 }}>
                    Sort:
                </span>
                {current?.label}
                <ChevronDown size={16} color="var(--text-3)" />
            </button>

            {open && (
                <div className="mq-menu">
                    {options.map((o) => (
                        <button
                            key={o.key}
                            className={`mq-menu-item ${
                                o.key === value ? "is-active" : ""
                            }`}
                            onClick={() => {
                                onChange(o.key);
                                setOpen(false);
                            }}
                        >
                            {o.label}
                            {o.key === value && (
                                <Check
                                    size={15}
                                    color="var(--rose)"
                                    strokeWidth={2.4}
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
