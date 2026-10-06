"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                    <Link
                        href="/home"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                            SH
                        </div>

                        <span className="hidden text-xl font-bold text-gray-900 sm:block">
              Social Hub
            </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/search"
                            className="rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                            Search
                        </Link>

                        <Link
                            href="/notifications"
                            className="rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                            Notifications
                        </Link>

                        <Link
                            href="/profile"
                            className="rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                            Profile
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
                {/* Feed */}
                <section>
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Home
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Posts from people you follow
                            </p>
                        </div>

                        <Link
                            href="/create-post"
                            className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                            + Create post
                        </Link>
                    </div>

                    {/* Empty feed */}
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
                            📷
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            Your feed is empty
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            Follow some people to see their posts here.
                            You can also create your own post and share
                            something with the Social Hub community.
                        </p>

                        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/search"
                                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                            >
                                Find people
                            </Link>

                            <Link
                                href="/create-post"
                                className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                                Create a post
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 space-y-4">
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="font-semibold text-gray-900">
                                Quick links
                            </h2>

                            <nav className="mt-4 space-y-1">
                                <Link
                                    href="/profile"
                                    className="block rounded-xl px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    My profile
                                </Link>

                                <Link
                                    href="/search"
                                    className="block rounded-xl px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    Find people
                                </Link>

                                <Link
                                    href="/notifications"
                                    className="block rounded-xl px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    Notifications
                                </Link>

                                <Link
                                    href="/settings"
                                    className="block rounded-xl px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    Settings
                                </Link>
                            </nav>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="font-semibold text-gray-900">
                                Social Hub
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Share moments, discover people, and stay
                                connected with your community.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}