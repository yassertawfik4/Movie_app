import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as registerUser } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Validation schema (kept outside the component so it isn't recreated each render)
const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Register = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: { firstName: "", email: "", password: "" },
  });

  // Only runs when validation passes
  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");
    try {
      const response = await registerUser(
        data.firstName,
        data.email,
        data.password,
      );
      console.log("Register response:", response);
      // API returns a message: success ("User created successfully") or
      // error ("User already exists"), both with a 200 status
      if (response?.message) {
        if (/success/i.test(response.message)) {
          setSuccessMessage(response.message);
        } else {
          setServerError(response.message);
        }
        return;
      }
      // TODO: redirect once routing is set up, e.g. navigate("/login")
    } catch (err) {
      setServerError(err?.response?.data?.message || "Registration failed");
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
          <h1 className="text-2xl font-bold text-neutral-900">
            Create account
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Sign up to start your watch list.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName" className="text-neutral-700">
                first name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your firstName"
                aria-invalid={!!errors.firstName}
                className="focus-visible:ring-0 focus-visible:border-[#F5C518]"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-neutral-700">
                Email
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

            {successMessage && (
              <p className="text-sm text-green-600">{successMessage}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-[#F5C518] font-semibold text-neutral-900 hover:bg-[#e0b416] cursor-pointer"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-neutral-900 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
