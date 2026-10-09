"use client";

import Link from "next/link";

export default function HomePage() {
    const headingFont = {
        fontFamily: "'Times New Roman', Times, serif",
    };

    const bodyFont = {
        fontFamily: "'Source Sans Pro', Arial, sans-serif",
        fontWeight: 400,
    };

    return (
        <main
            className="min-h-screen bg-[#E1D8CC] text-[#2B0505]"
            style={bodyFont}
        >
            {/* Header */}
            <header className="sticky top-0 z-20 border-b border-[#2B0505]/10 bg-[#E1D8CC]/95 backdrop-blur-md">
                <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
                    <Link
                        href="/home"
                        className="shrink-0"
                        aria-label="Social Hub home"
                    >
                        <span
                            className="text-2xl font-bold tracking-tight text-[#2B0505] sm:text-3xl"
                            style={headingFont}
                        >
                            Social Hub
                        </span>
                    </Link>

                    <nav
                        aria-label="Main navigation"
                        className="flex items-center gap-1 sm:gap-3"
                    >
                        <Link
                            href="/search"
                            className="rounded-full px-3 py-2 text-sm text-[#2B0505]/80 transition hover:bg-[#797454]/15 hover:text-[#2B0505] sm:px-4"
                        >
                            Search
                        </Link>

                        <Link
                            href="/notifications"
                            className="rounded-full px-3 py-2 text-sm text-[#2B0505]/80 transition hover:bg-[#797454]/15 hover:text-[#2B0505] sm:px-4"
                        >
                            Notifications
                        </Link>

                        <Link
                            href="/profile"
                            className="rounded-full border border-[#797454]/40 px-3 py-2 text-sm text-[#2B0505] transition hover:bg-[#797454]/15 sm:px-5"
                        >
                            Profile
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Page content */}
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
                {/* Feed */}
                <section className="min-w-0">
                    <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#797454]">
                                YOUR COMMUNITY
                            </p>

                            <h1
                                className="text-4xl font-bold tracking-tight text-[#2B0505] sm:text-5xl"
                                style={headingFont}
                            >
                                Home
                            </h1>

                            <p className="mt-3 text-base text-[#2B0505]/65">
                                Posts from people you follow
                            </p>
                        </div>

                        <Link
                            href="/create-post"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#797454] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#686346] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#797454] focus:ring-offset-2 focus:ring-offset-[#E1D8CC]"
                        >
                            Create post
                        </Link>
                    </div>

                    {/* Empty feed */}
                    <div className="overflow-hidden rounded-3xl border border-[#797454]/20 bg-[#F5EFE7] shadow-[0_8px_30px_rgba(43,5,5,0.04)]">
                        <div className="h-1.5 bg-[#797454]" />

                        <div className="px-6 py-14 text-center sm:px-12 sm:py-20">
                            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#797454]/25 bg-[#E1D8CC]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#797454"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="3"
                                    />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="m21 15-5-5L5 21" />
                                </svg>
                            </div>

                            <h2
                                className="text-3xl font-bold tracking-tight text-[#2B0505] sm:text-4xl"
                                style={headingFont}
                            >
                                Your story starts here
                            </h2>

                            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#2B0505]/65">
                                Your feed is looking a little quiet. Find
                                people to connect with, follow their updates,
                                or share something of your own with the Social
                                Hub community.
                            </p>

                            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    href="/search"
                                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#797454]/50 px-7 py-3 text-sm font-semibold text-[#2B0505] transition hover:border-[#797454] hover:bg-[#E1D8CC]"
                                >
                                    Find people
                                </Link>

                                <Link
                                    href="/create-post"
                                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#797454] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#686346]"
                                >
                                    Share your first post
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sidebar */}
                <aside className="min-w-0">
                    <div className="space-y-5 lg:sticky lg:top-28">
                        {/* Quick links */}
                        <div className="rounded-3xl border border-[#797454]/20 bg-[#F5EFE7] p-6 shadow-[0_8px_30px_rgba(43,5,5,0.03)]">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#797454]">
                                EXPLORE
                            </p>

                            <h2
                                className="text-2xl font-bold text-[#2B0505]"
                                style={headingFont}
                            >
                                Quick links
                            </h2>

                            <nav className="mt-5 space-y-1">
                                <Link
                                    href="/profile"
                                    className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#2B0505]/75 transition hover:bg-[#E1D8CC] hover:text-[#2B0505]"
                                >
                                    <span>My profile</span>
                                    <span className="text-lg text-[#797454] transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>

                                <Link
                                    href="/search"
                                    className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#2B0505]/75 transition hover:bg-[#E1D8CC] hover:text-[#2B0505]"
                                >
                                    <span>Find people</span>
                                    <span className="text-lg text-[#797454] transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>

                                <Link
                                    href="/notifications"
                                    className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#2B0505]/75 transition hover:bg-[#E1D8CC] hover:text-[#2B0505]"
                                >
                                    <span>Notifications</span>
                                    <span className="text-lg text-[#797454] transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>

                                <Link
                                    href="/settings"
                                    className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#2B0505]/75 transition hover:bg-[#E1D8CC] hover:text-[#2B0505]"
                                >
                                    <span>Settings</span>
                                    <span className="text-lg text-[#797454] transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </nav>
                        </div>

                        {/* About Social Hub */}
                        <div className="relative overflow-hidden rounded-3xl bg-[#2B0505] p-6 text-[#F5EFE7] shadow-[0_8px_30px_rgba(43,5,5,0.10)]">
                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/10" />
                            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full border border-white/10" />

                            <div className="relative">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5C0A2]">
                                    OUR SPACE
                                </p>

                                <h2
                                    className="text-3xl font-bold"
                                    style={headingFont}
                                >
                                    Social Hub
                                </h2>

                                <p className="mt-3 text-sm leading-7 text-[#F5EFE7]/75">
                                    A place to share moments, discover new
                                    people, and stay connected with your
                                    community.
                                </p>

                                <Link
                                    href="/search"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D8D2B5] transition hover:text-white"
                                >
                                    Discover your community
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}