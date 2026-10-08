"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/signin");
        router.refresh();
      } else {
        setLoggingOut(false);
      }
    } catch {
      setLoggingOut(false);
    }
  }

  return (
      <main className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-4">
            <Link
                href="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-100"
            >
              ←
            </Link>

            <h1 className="text-xl font-bold text-gray-900">
              Settings
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="space-y-6">
            {/* Account */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="font-semibold text-gray-900">
                  Account
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your Social Hub account.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                <Link
                    href="/profile"
                    className="flex items-center justify-between px-5 py-4 transition hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Edit profile
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Update your name, username, and bio.
                    </p>
                  </div>

                  <span className="text-gray-400">
                  →
                </span>
                </Link>

                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Password
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Change your password to keep your account secure.
                    </p>
                  </div>

                  <button
                      type="button"
                      className="rounded-xl border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      onClick={() =>
                          alert("Password changing will be connected next.")
                      }
                  >
                    Change
                  </button>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="font-semibold text-gray-900">
                  Preferences
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage how Social Hub works for you.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Notifications
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Receive notifications about activity on your account.
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  On
                </span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Profile visibility
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Your profile is currently visible to other users.
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  Public
                </span>
                </div>
              </div>
            </section>

            {/* Navigation */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">
                More
              </h2>

              <div className="mt-4 space-y-2">
                <Link
                    href="/notifications"
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <span>Notifications</span>
                  <span className="text-gray-400">→</span>
                </Link>

                <Link
                    href="/home"
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <span>Back to Home</span>
                  <span className="text-gray-400">→</span>
                </Link>
              </div>
            </section>

            {/* Sign out */}
            <section className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">
                Sign out
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sign out of your Social Hub account on this device.
              </p>

              <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="mt-4 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loggingOut ? "Signing out..." : "Sign out"}
              </button>
            </section>
          </div>
        </div>
      </main>
  );
}