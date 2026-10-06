"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
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
        setError(data.error || "Something went wrong.");
        return;
      }

      router.push("/welcome");
    } catch {
      setError("Unable to connect to Social Hub.");
    } finally {
      setLoading(false);
    }
  }

  return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white">
              SH
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Create your account
            </h1>

            <p className="mt-2 text-gray-500">
              Join Social Hub and connect with your community.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-gray-700"
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
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
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
                    value={form.password}
                    onChange={(event) =>
                        updateField("password", event.target.value)
                    }
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>

                <input
                    id="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(event) =>
                        updateField("confirmPassword", event.target.value)
                    }
                    placeholder="Enter your password again"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label
                    htmlFor="dateOfBirth"
                    className="mb-2 block text-sm font-medium text-gray-700"
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
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />

                <p className="mt-2 text-xs text-gray-500">
                  You must be at least 13 years old to use Social Hub.
                </p>
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
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                  href="/signin"
                  className="font-semibold text-gray-900 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
  );
}