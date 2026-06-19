import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import useToastStore from "../store/useToastStore";

const loginSchema = z.object({
    email: z.string().email({ message: "Enter a valid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
});

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const showToast = useToastStore((s) => s.show);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            await login(data.email, data.password);
            showToast("Signed in successfully");
            navigate("/account");
        } catch (err) {
            const msg = err?.message || "Login failed";
            setServerError(msg);
            showToast(msg, "error");
        }
    };

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "clamp(10px,4vh,48px) 0",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 430,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 22,
                    padding: "clamp(26px,4vw,38px)",
                    boxShadow: "0 24px 60px -24px rgba(0,0,0,.45)",
                    animation: "mq-popIn .25s ease both",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        marginBottom: 6,
                    }}
                >
                    <span
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "var(--rose)",
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        <Clapperboard size={20} color="#fff" strokeWidth={2} />
                    </span>
                    <span
                        style={{
                            fontWeight: 800,
                            fontSize: 18,
                            letterSpacing: ".16em",
                        }}
                    >
                        MARQUEE
                    </span>
                </div>

                <h1
                    style={{
                        fontSize: 27,
                        fontWeight: 800,
                        letterSpacing: "-.02em",
                        marginTop: 14,
                    }}
                >
                    Welcome back
                </h1>
                <p className="mq-sub" style={{ marginTop: 5 }}>
                    Sign in to access your wishlist and account.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        marginTop: 26,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    <div>
                        <label className="mq-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            placeholder="you@example.com"
                            className={`mq-input ${errors.email ? "is-error" : ""}`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <div className="mq-field-err">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mq-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className={`mq-input ${
                                errors.password ? "is-error" : ""
                            }`}
                            {...register("password")}
                        />
                        {errors.password && (
                            <div className="mq-field-err">
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    {serverError && (
                        <div className="mq-field-err">{serverError}</div>
                    )}

                    <button
                        type="submit"
                        className="mq-btn"
                        disabled={isSubmitting}
                        style={{
                            height: 50,
                            borderRadius: 13,
                            fontSize: 15.5,
                            fontWeight: 700,
                            marginTop: 4,
                        }}
                    >
                        {isSubmitting ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p
                    className="mq-sub"
                    style={{ textAlign: "center", marginTop: 22 }}
                >
                    New here?{" "}
                    <Link
                        to="/register"
                        style={{
                            color: "var(--rose)",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
