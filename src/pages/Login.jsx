import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Validation schema (kept outside the component so it isn't recreated each render)
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
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

  // Only runs when validation passes
  const onSubmit = async (data) => {
    setServerError("");
    try {
      const response = await login(data.email, data.password);
      console.log("Login response:", response);
      // API may return a message (e.g. "Invalid credentials") with a 200 status
      if (response?.message) {
        setServerError(response.message);
        return;
      }
      // TODO: redirect once routing is set up, e.g. navigate("/")
    } catch (err) {
      setServerError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg">
        {/* Brand bar — matches the app's yellow header */}
        <div className="flex items-center gap-2 bg-[#F5C518] px-6 py-3">
          <span className="text-base font-bold tracking-tight text-neutral-900">
            🎬 Movie App
          </span>
        </div>

        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Sign in to continue to your watch list.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-neutral-700">
                email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                aria-invalid={!!errors.email}
                className="focus-visible:ring-0 focus-visible:border-[#F5C518]"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-neutral-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="focus-visible:ring-0 focus-visible:border-[#F5C518]"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-red-600">{serverError}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-[#F5C518] font-semibold text-neutral-900 hover:bg-[#e0b416] cursor-pointer"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-medium text-neutral-900 hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
