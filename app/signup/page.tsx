
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const COLORS = {
  background: "#F8F8F4",
  beige: "#E7E7DD",
  text: "#210303",
  brown: "#6B5B4D",
};

type SignupForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
};

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: keyof SignupForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to create your account.");
        return;
      }

      router.push("/welcome");
      router.refresh();
    } catch {
      setError("Unable to connect to Social Hub. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
      "w-full rounded-xl border bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2";

  const labelClassName = "mb-2 block text-sm font-bold";

  const inputStyle = {
    borderColor: "rgba(33, 3, 3, 0.18)",
    color: COLORS.text,
  };

  return (
      <main
          className="flex min-h-screen items-center justify-center px-4 py-10"
          style={{ backgroundColor: COLORS.background }}
      >
        <div className="w-full max-w-lg">
          {/* Brand */}
          <div className="mb-8 text-center">
            <Link
                href="/welcome"
                className="inline-block text-4xl font-bold tracking-tight sm:text-5xl"
                style={{
                  color: COLORS.text,
                  fontFamily: "'Calgary', Georgia, serif",
                }}
            >
              Social Hub
            </Link>
          </div>

          {/* Signup card */}
          <div
              className="rounded-3xl border p-6 shadow-sm sm:p-8"
              style={{
                backgroundColor: "rgba(231, 231, 221, 0.55)",
                borderColor: "rgba(33, 3, 3, 0.12)",
              }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First and last name */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                      htmlFor="firstName"
                      className={labelClassName}
                      style={{ color: COLORS.brown }}
                  >
                    First name
                  </label>

                  <input
                      id="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={(event) =>
                          updateField("firstName", event.target.value)
                      }
                      placeholder="John"
                      required
                      autoComplete="given-name"
                      className={inputClassName}
                      style={inputStyle}
                  />
                </div>

                <div>
                  <label
                      htmlFor="lastName"
                      className={labelClassName}
                      style={{ color: COLORS.brown }}
                  >
                    Last name
                  </label>

                  <input
                      id="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={(event) =>
                          updateField("lastName", event.target.value)
                      }
                      placeholder="Doe"
                      required
                      autoComplete="family-name"
                      className={inputClassName}
                      style={inputStyle}
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label
                    htmlFor="username"
                    className={labelClassName}
                    style={{ color: COLORS.brown }}
                >
                  Username
                </label>

                <input
                    id="username"
                    type="text"
                    value={form.username}
                    onChange={(event) =>
                        updateField("username", event.target.value)
                    }
                    placeholder="johndoe"
                    required
                    autoComplete="username"
                    className={inputClassName}
                    style={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label
                    htmlFor="email"
                    className={labelClassName}
                    style={{ color: COLORS.brown }}
                >
                  Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                        updateField("email", event.target.value)
                    }
                    placeholder="john@example.com"
                    required
                    autoComplete="email"
                    className={inputClassName}
                    style={inputStyle}
                />
              </div>

              {/* Password */}
              <div>
                <label
                    htmlFor="password"
                    className={labelClassName}
                    style={{ color: COLORS.brown }}
                >
                  Password
                </label>

                <div className="relative">
                  <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(event) =>
                          updateField("password", event.target.value)
                      }
                      placeholder="At least 8 characters"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className={`${inputClassName} pr-12`}
                      style={inputStyle}
                  />

                  <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 transition hover:bg-black/5"
                      style={{ color: COLORS.brown }}
                  >
                    {showPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs" style={{ color: COLORS.brown }}>
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label
                    htmlFor="confirmPassword"
                    className={labelClassName}
                    style={{ color: COLORS.brown }}
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(event) =>
                          updateField("confirmPassword", event.target.value)
                      }
                      placeholder="Enter your password again"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className={`${inputClassName} pr-12`}
                      style={inputStyle}
                  />

                  <button
                      type="button"
                      onClick={() =>
                          setShowConfirmPassword((current) => !current)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 transition hover:bg-black/5"
                      style={{ color: COLORS.brown }}
                  >
                    {showConfirmPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Date of birth */}
              <div>
                <label
                    htmlFor="dateOfBirth"
                    className={labelClassName}
                    style={{ color: COLORS.brown }}
                >
                  Date of birth
                </label>

                <input
                    id="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(event) =>
                        updateField("dateOfBirth", event.target.value)
                    }
                    required
                    autoComplete="bday"
                    max={new Date().toISOString().split("T")[0]}
                    className={inputClassName}
                    style={inputStyle}
                />

                <p className="mt-2 text-xs" style={{ color: COLORS.brown }}>
                  You must be at least 13 years old to use Social Hub.
                </p>
              </div>

              {/* Error message */}
              {error && (
                  <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
              )}

              {/* Submit */}
              <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl px-6 py-3.5 font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundColor: COLORS.text,
                    color: COLORS.beige,
                  }}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {/* Sign-in link */}
            <div
                className="mt-6 border-t pt-6 text-center text-sm"
                style={{
                  borderColor: "rgba(33, 3, 3, 0.12)",
                  color: COLORS.brown,
                }}
            >
              Already have an account?{" "}
              <Link
                  href="/signin"
                  className="font-bold underline-offset-4 hover:underline"
                  style={{ color: COLORS.text }}
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p
              className="mt-6 text-center text-xs"
              style={{ color: COLORS.brown }}
          >
            Join your community on Social Hub.
          </p>
        </div>
      </main>
  );
}
