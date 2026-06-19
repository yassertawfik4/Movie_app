import { Film } from "lucide-react";

const EmptyState = ({
    icon: Icon = Film,
    iconColor = "var(--text-3)",
    title = "Nothing here yet",
    message = "Try adjusting your search or filters.",
    action,
}) => {
    return (
        <div style={{ textAlign: "center", padding: "64px 20px" }}>
            <div
                style={{
                    width: 78,
                    height: 78,
                    borderRadius: "50%",
                    background: "var(--surface-2)",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 18px",
                }}
            >
                <Icon size={34} color={iconColor} strokeWidth={1.7} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h3>
            <p
                style={{
                    color: "var(--text-3)",
                    marginTop: 6,
                    fontSize: 15,
                    maxWidth: 400,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                {message}
            </p>
            {action}
        </div>
    );
};

export default EmptyState;
