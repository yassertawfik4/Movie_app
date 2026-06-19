import { Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";

const Footer = () => {
    return (
        <footer className="mq-footer">
            <div className="mq-footer-inner">
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textDecoration: "none",
                        color: "var(--text)",
                    }}
                >
                    <span
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: "var(--rose)",
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        <Clapperboard size={15} color="#fff" strokeWidth={2} />
                    </span>
                    <span
                        style={{
                            fontWeight: 800,
                            letterSpacing: ".16em",
                            fontSize: 15,
                        }}
                    >
                        MARQUEE
                    </span>
                </Link>

                <p style={{ color: "var(--text-3)", fontSize: 13.5 }}>
                    Movie data from TMDB · Built with React
                </p>

                <Link
                    to="/this-page-does-not-exist"
                    style={{
                        color: "var(--text-3)",
                        fontSize: 13,
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                    }}
                >
                    View 404 page
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
