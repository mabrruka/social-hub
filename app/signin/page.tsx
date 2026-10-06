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

  return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
          <div className="w-full">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white">
                SH
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back
              </h1>

              <p className="mt-2 text-gray-500">
                Sign in to continue to Social Hub.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                      htmlFor="login"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
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
                    className="w-full rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="font-semibold text-gray-900 hover:underline"
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