
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

export default function NotificationsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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

        {/* Page content */}
        <section className="min-h-screen pt-[96px] lg:ml-[260px]">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="mt-2 text-sm text-gray-600">
              Stay up to date with activity on Social Hub.
            </p>

            <section className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-sm font-semibold">Recent activity</h2>
              </div>

              <div className="px-6 py-16 text-center">
                <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: COLORS.background,
                      color: COLORS.text,
                    }}
                >
                  <Bell size={28} />
                </div>

                <h2 className="mt-5 text-lg font-semibold">
                  You&apos;re all caught up
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  When someone follows you, likes your posts, or comments
                  on something you shared, you&apos;ll see it here.
                </p>

                <Link
                    href="/search"
                    className="mt-6 inline-block rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-80"
                    style={{
                      backgroundColor: COLORS.text,
                      color: COLORS.background,
                    }}
                >
                  Find people
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>
  );
}
