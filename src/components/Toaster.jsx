import { Check, AlertCircle } from "lucide-react";
import useToastStore from "../store/useToastStore";

const Toaster = () => {
    const toasts = useToastStore((s) => s.toasts);
    if (!toasts.length) return null;

    return (
        <>
            {toasts.map((t, i) => {
                const isError = t.kind === "error";
                return (
                    <div
                        key={t.id}
                        className="mq-toast"
                        style={{ top: 22 + i * 62 }}
                    >
                        <span
                            className="mq-toast-icon"
                            style={{
                                background: isError
                                    ? "var(--rose)"
                                    : "#1f8a5b",
                            }}
                        >
                            {isError ? (
                                <AlertCircle
                                    size={15}
                                    color="#fff"
                                    strokeWidth={2.4}
                                />
                            ) : (
                                <Check
                                    size={15}
                                    color="#fff"
                                    strokeWidth={2.4}
                                />
                            )}
                        </span>
                        <span
                            style={{
                                fontSize: 14.5,
                                fontWeight: 600,
                                color: "var(--text)",
                            }}
                        >
                            {t.msg}
                        </span>
                    </div>
                );
            })}
        </>
    );
};

export default Toaster;
