
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
  Settings as SettingsIcon,
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
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function SettingsPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

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
      ? `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()
      : "?";

  return (
      <main
          className="min-h-screen"
          style={{ backgroundColor: "#F8F8F4", color: COLORS.text }}
      >
        {/* Top banner */}
        <header
            className="fixed right-0 top-0 z-30 flex h-[72px] items-center justify-end gap-5 px-6"
            style={{
              backgroundColor: COLORS.background,
              left: 0,
            }}
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

          {/* User profile and sign out */}
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
                disabled={loggingOut}
                className="mt-3 flex items-center gap-3 px-3 py-2 text-sm font-semibold transition hover:opacity-70 disabled:opacity-50"
                style={{ color: COLORS.logout }}
            >
              <LogOut size={19} />
              {loggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </aside>

        {/* Settings content */}
        <section className="min-h-screen pt-[96px] lg:ml-[260px]">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <h1 className="text-3xl font-bold">Settings</h1>

            <p className="mt-2 text-sm text-gray-600">
              Manage your account and Social Hub preferences.
            </p>

            <div className="mt-8 space-y-6">
              {/* Account */}
              <section className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-4">
                  <h2 className="font-semibold">Account</h2>
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
                      <p className="text-sm font-medium">Edit profile</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Update your profile information, photo, and bio.
                      </p>
                    </div>
                    <span className="text-gray-400">→</span>
                  </Link>

                  <div className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-sm font-medium">Password</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Change your password to keep your account secure.
                      </p>
                    </div>

                    <button
                        type="button"
                        className="rounded-xl border border-gray-300 px-3 py-2 text-xs font-semibold transition hover:bg-gray-50"
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
              <section className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-4">
                  <h2 className="font-semibold">Preferences</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage how Social Hub works for you.
                  </p>
                </div>

                <div className="divide-y divide-gray-100">
                  <div className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-sm font-medium">Notifications</p>
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
                      <p className="text-sm font-medium">Profile visibility</p>
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

              {/* More navigation */}
              <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <h2 className="font-semibold">More</h2>

                <div className="mt-4 space-y-2">
                  <Link
                      href="/notifications"
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm transition hover:bg-gray-50"
                  >
                    <span>Notifications</span>
                    <span className="text-gray-400">→</span>
                  </Link>

                  <Link
                      href="/home"
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm transition hover:bg-gray-50"
                  >
                    <span>Back to Home</span>
                    <span className="text-gray-400">→</span>
                  </Link>
                </div>
              </section>

              {/* Sign out */}
              <section className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                <h2 className="font-semibold">Sign out</h2>

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
        </section>
      </main>
  );
}
