
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

export default function SignInPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid username/email or password.");
        return;
      }

      router.push("/home");
      router.refresh();
    } catch {
      setError("Unable to connect to Social Hub. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
      <main
          className="flex min-h-screen items-center justify-center px-4 py-10"
          style={{ backgroundColor: COLORS.background }}
      >
        <div className="w-full max-w-md">
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

          {/* Sign-in card */}
          <div
              className="rounded-3xl border p-6 shadow-sm sm:p-9"
              style={{
                backgroundColor: "rgba(231, 231, 221, 0.55)",
                borderColor: "rgba(33, 3, 3, 0.12)",
              }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username or email */}
              <div>
                <label
                    htmlFor="login"
                    className="mb-2 block text-sm font-bold"
                    style={{ color: COLORS.brown }}
                >
                  Username or email
                </label>

                <input
                    id="login"
                    type="text"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                    placeholder="Enter your username or email"
                    required
                    autoComplete="username"
                    className="w-full rounded-xl border bg-white/80 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2"
                    style={{
                      borderColor: "rgba(33, 3, 3, 0.18)",
                      color: COLORS.text,
                      outlineColor: COLORS.text,
                    }}
                />
              </div>

              {/* Password */}
              <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold"
                    style={{ color: COLORS.brown }}
                >
                  Password
                </label>

                <div className="relative">
                  <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className="w-full rounded-xl border bg-white/80 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2"
                      style={{
                        borderColor: "rgba(33, 3, 3, 0.18)",
                        color: COLORS.text,
                      }}
                  />

                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 transition hover:bg-black/5"
                      style={{ color: COLORS.brown }}
                  >
                    {showPassword ? (
                        <EyeOff size={19} />
                    ) : (
                        <Eye size={19} />
                    )}
                  </button>
                </div>
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Sign-up link */}
            <div
                className="mt-6 border-t pt-6 text-center text-sm"
                style={{
                  borderColor: "rgba(33, 3, 3, 0.12)",
                  color: COLORS.brown,
                }}
            >
              Don&apos;t have an account?{" "}
              <Link
                  href="/signup"
                  className="font-bold underline-offset-4 hover:underline"
                  style={{ color: COLORS.text }}
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p
              className="mt-6 text-center text-xs"
              style={{ color: COLORS.brown }}
          >
            Connect with your community on Social Hub.
          </p>
        </div>
      </main>
  );
}
