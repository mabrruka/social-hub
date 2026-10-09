
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    House,
    Search,
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
    { label: "Search", href: "/search", icon: Search },
    { label: "Create Post", href: "/create-post", icon: PlusSquare },
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Profile", href: "/profile", icon: UserRound },
    { label: "Settings", href: "/settings", icon: Settings },
];

export default function HomePage() {
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch("/api/auth/me");
                const data = await response.json();

                if (response.ok && data.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Unable to load user profile:", error);
            }
        }

        loadUser();
    }, []);

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

    const initials = user
        ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
        : "U";

    return (
        <main
            className="min-h-screen"
            style={{ backgroundColor: "#F7F6F0" }}
        >
            {/* Top banner */}
            <header
                className="fixed left-0 right-0 top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#210303]/10 px-5 sm:px-8 lg:left-[260px]"
                style={{ backgroundColor: COLORS.background }}
            >
                <Link
                    href="/home"
                    className="text-xl font-bold tracking-wide lg:hidden"
                    style={{ color: COLORS.text }}
                >
                    Social Hub
                </Link>

                <div className="hidden lg:block" />

                <div className="ml-auto flex items-center gap-3">
                    <Link
                        href="/notifications"
                        aria-label="Notifications"
                        className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#210303]/10"
                        style={{ color: COLORS.text }}
                    >
                        <Bell size={22} strokeWidth={1.8} />
                    </Link>

                    <Link
                        href="/profile"
                        aria-label="My profile"
                        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#210303]/20 bg-white transition hover:opacity-80"
                        style={{ color: COLORS.text }}
                    >
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt="Your profile"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <UserRound size={23} strokeWidth={1.8} />
                        )}
                    </Link>
                </div>
            </header>

            {/* Left navigation banner */}
            <aside
                className="fixed bottom-0 left-0 top-0 z-40 flex w-[260px] flex-col border-r border-[#210303]/10 px-4 py-6"
                style={{ backgroundColor: COLORS.background }}
            >
                {/* Brand */}
                <Link
                    href="/home"
                    className="mb-10 px-3 text-2xl font-bold tracking-wide"
                    style={{ color: COLORS.text }}
                >
                    Social Hub
                </Link>

                {/* Navigation links */}
                <nav className="space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors"
                                style={{
                                    backgroundColor: isActive ? COLORS.text : "transparent",
                                    color: isActive ? COLORS.background : COLORS.text,
                                }}
                            >
                                <Icon size={21} strokeWidth={1.8} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Profile and logout at the bottom */}
                <div className="mt-auto">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-[#210303]/5"
                    >
                        <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#210303]/20 bg-white"
                            style={{ color: COLORS.text }}
                        >
                            {user?.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-sm font-semibold">{initials}</span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <p
                                className="truncate text-sm font-semibold"
                                style={{ color: COLORS.text }}
                            >
                                {user
                                    ? `${user.firstName} ${user.lastName}`
                                    : "Your profile"}
                            </p>

                            <p className="truncate text-xs text-[#6B5B4D]">
                                {user ? `@${user.username}` : "View profile"}
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-[#6B5B4D]/10 disabled:opacity-50"
                        style={{ color: COLORS.logout }}
                    >
                        <LogOut size={20} strokeWidth={1.8} />
                        {loggingOut ? "Logging out..." : "Log out"}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="min-h-screen pt-[72px] lg:ml-[260px]">
                <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
                    <section>
                        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h1
                                    className="text-3xl font-bold"
                                    style={{ color: COLORS.text }}
                                >
                                    Home
                                </h1>

                                <p className="mt-2 text-sm text-[#6B5B4D]">
                                    Posts from people you follow
                                </p>
                            </div>

                            <Link
                                href="/create-post"
                                className="inline-flex items-center justify-center gap-2 self-start rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-90"
                                style={{
                                    backgroundColor: COLORS.text,
                                    color: COLORS.background,
                                }}
                            >
                                <PlusSquare size={18} />
                                Create post
                            </Link>
                        </div>

                        {/* Empty feed */}
                        <div className="rounded-2xl border border-[#210303]/10 bg-white px-6 py-16 text-center shadow-sm">
                            <div
                                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                                style={{
                                    backgroundColor: COLORS.background,
                                    color: COLORS.text,
                                }}
                            >
                                <House size={28} strokeWidth={1.5} />
                            </div>

                            <h2
                                className="mt-5 text-xl font-semibold"
                                style={{ color: COLORS.text }}
                            >
                                Your feed is empty
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B5B4D]">
                                Follow some people to see their posts here. You can also
                                create your own post and share something with the Social Hub
                                community.
                            </p>

                            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    href="/search"
                                    className="rounded-xl border border-[#210303]/20 px-5 py-3 text-sm font-semibold transition hover:bg-[#E7E7DD]/60"
                                    style={{ color: COLORS.text }}
                                >
                                    Find people
                                </Link>

                                <Link
                                    href="/create-post"
                                    className="rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-90"
                                    style={{
                                        backgroundColor: COLORS.text,
                                        color: COLORS.background,
                                    }}
                                >
                                    Create a post
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
