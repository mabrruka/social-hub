
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4">
                    <Link
                        href="/home"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-100"
                    >
                        ←
                    </Link>

                    <h1 className="text-xl font-bold text-gray-900">
                        Search
                    </h1>
                </div>
            </header>

            <div className="mx-auto max-w-3xl px-4 py-8">
                {/* Search box */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <label
                            htmlFor="search"
                            className="mb-2 block text-sm font-semibold text-gray-900"
                        >
                            Find people
                        </label>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                id="search"
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search by username or name..."
                                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                            />

                            <button
                                type="submit"
                                className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results */}
                <div className="mt-6">
                    {query.trim() === "" ? (
                        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
                                🔎
                            </div>

                            <h2 className="mt-5 text-lg font-semibold text-gray-900">
                                Find your people
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                Search for people by their name or username
                                to discover new members of the Social Hub
                                community.
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-900">
                                Search results
                            </h2>

                            <div className="mt-4 rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                                User search will be connected to the database next.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}