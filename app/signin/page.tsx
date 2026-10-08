

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
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
          login,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid username/email or password.");
        return;
      }

      router.push("/home");
    } catch {
      setError("Unable to connect to Social Hub.");
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
      "w-full rounded-xl border border-[#D8D2C8] bg-white/95 px-4 py-3 text-[#4E362C] placeholder:text-gray-500 outline-none transition focus:border-[#797454] focus:ring-1 focus:ring-[#797454]";

  return (
      <main
          className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-fixed px-4 py-10"
          style={{
            backgroundImage:
                "url('https://i.pinimg.com/736x/75/9d/ac/759dac2adc6bc964a40d85bf822278cd.jpg')",
          }}
      >
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
          <div className="w-full">
            <div className="mb-8 text-center">
              <h1
                  className="text-5xl font-bold tracking-wide text-[#4E362C]"
                  style={{
                    fontFamily: "'Calgary', Georgia, serif",
                    textShadow: "0 1px 12px rgba(255,255,255,0.35)",
                  }}
              >
                Social Hub
              </h1>
            </div>

            <div className="rounded-2xl bg-[#FAF8F3]/95 p-6 shadow-2xl ring-1 ring-white/40 backdrop-blur-sm sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                      htmlFor="login"
                      className="mb-2 block text-sm font-bold text-[#797454]"
                      style={{
                        fontFamily: "'Noto Serif Display ExtraC', Georgia, serif",
                      }}
                  >
                    Username or email
                  </label>

                  <input
                      id="login"
                      type="text"
                      value={login}
                      onChange={(event) => setLogin(event.target.value)}
                      placeholder="johndoe or john@example.com"
                      required
                      autoComplete="username"
                      className={inputClassName}
                  />
                </div>

                <div>
                  <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-bold text-[#797454]"
                      style={{
                        fontFamily: "'Noto Serif Display ExtraC', Georgia, serif",
                      }}
                  >
                    Password
                  </label>

                  <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className={inputClassName}
                  />
                </div>

                {error && (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#4E362C] px-6 py-3.5 font-semibold text-white transition hover:bg-[#39271F] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <div className="mt-6 border-t border-[#D8D2C8] pt-6 text-center text-sm text-[#4E362C]">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="font-bold text-[#797454] hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}