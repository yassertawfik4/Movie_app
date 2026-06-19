import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
    return (
        <section
            style={{
                textAlign: "center",
                padding: "clamp(40px,10vh,110px) 20px",
            }}
        >
            <div
                className="mq-serif"
                style={{
                    fontSize: "clamp(110px,22vw,200px)",
                    lineHeight: 0.9,
                    color: "var(--rose)",
                }}
            >
                404
            </div>
            <h1
                style={{
                    fontSize: "clamp(24px,4vw,32px)",
                    fontWeight: 800,
                    letterSpacing: "-.02em",
                    marginTop: 10,
                }}
            >
                This scene was cut
            </h1>
            <p
                style={{
                    color: "var(--text-3)",
                    fontSize: 16,
                    marginTop: 8,
                    maxWidth: 420,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="mq-btn"
                style={{
                    marginTop: 26,
                    height: 48,
                    padding: "0 24px",
                    borderRadius: 13,
                    fontSize: 15,
                    fontWeight: 700,
                    textDecoration: "none",
                }}
            >
                Back to Home
                <ArrowRight size={18} />
            </Link>
        </section>
    );
};

export default NotFound;
