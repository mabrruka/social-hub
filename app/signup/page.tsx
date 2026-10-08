// Sign up page

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

  const inputClassName =
      "w-full rounded-xl border border-[#D8D2C8] bg-white/95 px-4 py-3 text-[#4E362C] placeholder:text-gray-500 outline-none transition focus:border-[#797454] focus:ring-1 focus:ring-[#797454]";

  const labelClassName =
      "mb-2 block text-sm font-bold text-[#797454]";

  const labelStyle = {
    fontFamily: "'Noto Serif Display ExtraC', Georgia, serif",
  };

  return (
      <main
          className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-fixed px-4 py-10"
          style={{
            backgroundImage:
                "url('https://i.pinimg.com/736x/75/9d/ac/759dac2adc6bc964a40d85bf822278cd.jpg')",
          }}
      >
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-lg">
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
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                      htmlFor="firstName"
                      className={labelClassName}
                      style={labelStyle}
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
                  />
                </div>

                <div>
                  <label
                      htmlFor="lastName"
                      className={labelClassName}
                      style={labelStyle}
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
                  />
                </div>
              </div>

              <div>
                <label
                    htmlFor="username"
                    className={labelClassName}
                    style={labelStyle}
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
                />
              </div>

              <div>
                <label
                    htmlFor="email"
                    className={labelClassName}
                    style={labelStyle}
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
                />
              </div>

              <div>
                <label
                    htmlFor="password"
                    className={labelClassName}
                    style={labelStyle}
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
                    autoComplete="new-password"
                    className={inputClassName}
                />
              </div>

              <div>
                <label
                    htmlFor="confirmPassword"
                    className={labelClassName}
                    style={labelStyle}
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
                    autoComplete="new-password"
                    className={inputClassName}
                />
              </div>

              <div>
                <label
                    htmlFor="dateOfBirth"
                    className={labelClassName}
                    style={labelStyle}
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
                    className={inputClassName}
                />

                <p className="mt-2 text-xs text-[#4E362C]/75">
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
                  className="w-full rounded-xl bg-[#4E362C] px-6 py-3.5 font-semibold text-white transition hover:bg-[#39271F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-6 border-t border-[#D8D2C8] pt-6 text-center text-sm text-[#4E362C]">
              Already have an account?{" "}
              <Link
                  href="/signin"
                  className="font-bold text-[#797454] hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
  );
}