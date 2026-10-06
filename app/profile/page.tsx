"use client";

import Link from "next/link";

export default function ProfilePage() {
  return (
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
            <Link
                href="/home"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-100"
            >
              ←
            </Link>

            <h1 className="text-xl font-bold text-gray-900">
              Profile
            </h1>

            <Link
                href="/settings"
                className="rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Settings
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-8">
          {/* Profile card */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <div className="flex justify-center sm:justify-start">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold text-gray-600">
                  SH
                </div>
              </div>

              {/* Profile information */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Your Name
                    </h2>

                    <p className="text-sm text-gray-500">
                      @username
                    </p>
                  </div>

                  <Link
                      href="/settings"
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Edit profile
                  </Link>
                </div>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-600 sm:mx-0">
                  Welcome to my Social Hub profile. This is where
                  your bio will appear.
                </p>

                {/* Stats */}
                <div className="mt-6 flex justify-center gap-8 sm:justify-start">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      0
                    </p>

                    <p className="text-xs text-gray-500">
                      Posts
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      0
                    </p>

                    <p className="text-xs text-gray-500">
                      Followers
                    </p>
                  </div>

                  <div className="text-center">
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

          {/* Posts */}
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
                  className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Create a post
              </Link>
            </div>
          </section>
        </div>
      </main>
  );
}