
"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    House,
    Search as SearchIcon,
    PlusSquare,
    Bell,
    UserRound,
    Settings,
    LogOut,
} from "lucide-react";

type User = {
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl: string | null;
};

const COLORS = {
    background: "#E7E7DD",
    text: "#210303",
    logout: "#6B5B4D",
};

const navigation = [
    { label: "Home", href: "/home", icon: House },
    { label: "Search", href: "/search", icon: SearchIcon },
    { label: "Create Post", href: "/create-post", icon: PlusSquare },
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Profile", href: "/profile", icon: UserRound },
    { label: "Settings", href: "/settings", icon: Settings },
];

export default function SearchPage() {
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetch("/api/auth/me")
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                }
            })
            .catch(() => {
                setUser(null);
            });
    }, []);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                router.push("/signin");
                router.refresh();
            }
        } catch {
            console.error("Unable to sign out.");
        }
    }

    const initials = user
        ? `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()
        : "?";

    return (
        <main
            className="min-h-screen"
            style={{ backgroundColor: "#F8F8F4", color: COLORS.text }}
        >
            {/* Top banner */}
            <header
                className="fixed right-0 top-0 z-30 flex h-[72px] items-center justify-end gap-5 px-6 lg:left-[260px]"
                style={{ backgroundColor: COLORS.background, left: 0 }}
            >
                <Link
                    href="/notifications"
                    aria-label="Notifications"
                    className="rounded-xl p-2 transition hover:bg-black/5"
                >
                    <Bell size={23} />
                </Link>

                <Link
                    href="/profile"
                    aria-label="Profile"
                    className="rounded-xl p-2 transition hover:bg-black/5"
                >
                    <UserRound size={23} />
                </Link>
            </header>

            {/* Left sidebar */}
            <aside
                className="fixed bottom-0 left-0 top-0 z-40 flex w-[260px] flex-col border-r border-black/10"
                style={{ backgroundColor: COLORS.background }}
            >
                <div className="px-6 py-7">
                    <Link
                        href="/home"
                        className="text-2xl font-bold tracking-wide"
                        style={{ color: COLORS.text }}
                    >
                        Social Hub
                    </Link>
                </div>

                <nav className="flex-1 space-y-2 px-3">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition"
                                style={{
                                    backgroundColor: active ? COLORS.text : "transparent",
                                    color: active ? COLORS.background : COLORS.text,
                                }}
                            >
                                <Icon size={21} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User and logout */}
                <div className="border-t border-black/10 p-4">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-black/5"
                    >
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt="Profile"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        ) : (
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-full font-semibold"
                                style={{
                                    backgroundColor: COLORS.text,
                                    color: COLORS.background,
                                }}
                            >
                                {initials}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                                {user
                                    ? `${user.firstName} ${user.lastName}`
                                    : "Your profile"}
                            </p>
                            <p className="truncate text-xs opacity-70">
                                {user ? `@${user.username}` : ""}
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-3 flex items-center gap-3 px-3 py-2 text-sm font-semibold transition hover:opacity-70"
                        style={{ color: COLORS.logout }}
                    >
                        <LogOut size={19} />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Search page content */}
            <section className="min-h-screen pt-[96px] lg:ml-[260px]">
                <div className="mx-auto max-w-3xl px-6 py-8">
                    <h1 className="text-3xl font-bold">Search</h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Discover people in the Social Hub community.
                    </p>

                    {/* Search box */}
                    <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                        <form onSubmit={handleSubmit}>
                            <label
                                htmlFor="search"
                                className="mb-2 block text-sm font-semibold"
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
                                    className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-[#210303] focus:ring-1 focus:ring-[#210303]"
                                />

                                <button
                                    type="submit"
                                    className="rounded-xl px-6 py-3 text-sm font-semibold transition hover:opacity-80"
                                    style={{
                                        backgroundColor: COLORS.text,
                                        color: COLORS.background,
                                    }}
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Search results */}
                    <div className="mt-6">
                        {query.trim() === "" ? (
                            <div className="rounded-2xl border border-black/10 bg-white px-6 py-16 text-center shadow-sm">
                                <div
                                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                                    style={{
                                        backgroundColor: COLORS.background,
                                        color: COLORS.text,
                                    }}
                                >
                                    <SearchIcon size={28} />
                                </div>

                                <h2 className="mt-5 text-lg font-semibold">
                                    Find your people
                                </h2>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                    Search for people by their name or username to discover
                                    new members of the Social Hub community.
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                                <h2 className="text-sm font-semibold">Search results</h2>

                                <div className="mt-4 rounded-xl px-4 py-6 text-center text-sm text-gray-500"
                                     style={{ backgroundColor: "#F8F8F4" }}
                                >
                                    User search will be connected to the database next.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
