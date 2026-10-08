"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  firstName: string;
  lastName: string;
  username: string;
  bio: string | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
        });
  }, []);

  if (!user) {
    return (
        <main className="min-h-screen bg-gray-50">
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-gray-500">
              Loading profile...
            </p>
          </div>
        </main>
    );
  }

  const initials =
      `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
      <main className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
            <Link
                href="/home"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              ←
            </Link>

            <h1 className="text-xl font-bold text-gray-900">
              Profile
            </h1>

            <Link
                href="/settings"
                className="rounded-xl px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Settings
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-8">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex justify-center sm:justify-start">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold text-gray-600">
                  {initials}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  @{user.username}
                </p>

                <p className="mt-4 text-sm text-gray-600">
                  {user.bio || "No bio yet."}
                </p>

                <div className="mt-6 flex justify-center gap-8 sm:justify-start">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      0
                    </p>
                    <p className="text-xs text-gray-500">
                      Posts
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      0
                    </p>
                    <p className="text-xs text-gray-500">
                      Followers
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      0
                    </p>
                    <p className="text-xs text-gray-500">
                      Following
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <div className="border-b border-gray-200">
              <h2 className="pb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Posts
              </h2>
            </div>

            <div className="py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
                📷
              </div>

              <h3 className="mt-5 font-semibold text-gray-900">
                No posts yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Share your first post with the Social Hub community.
              </p>

              <Link
                  href="/create-post"
                  className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Create a post
              </Link>
            </div>
          </section>
        </div>
      </main>
  );
}