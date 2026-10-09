
"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
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
  Camera,
  X,
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

export default function CreatePostPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [caption, setCaption] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          }
        })
        .catch(() => setUser(null));
  }, []);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      alert("Please choose a PNG, JPG, JPEG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
  }

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Post publishing will be connected to the database next.");
  }

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

        {/* Sidebar */}
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

        {/* Create post content */}
        <section className="min-h-screen pt-[96px] lg:ml-[260px]">
          <div className="mx-auto w-full max-w-2xl px-6 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Create a post</h1>
              <p className="mt-2 text-sm text-gray-600">
                Share something with the Social Hub community.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo */}
                <div>
                  <label className="mb-3 block text-sm font-semibold">
                    Photo
                  </label>

                  {!imagePreview ? (
                      <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-[#F8F8F4] px-6 text-center transition hover:border-[#6B5B4D] hover:bg-[#E7E7DD]/40">
                        <div
                            className="flex h-16 w-16 items-center justify-center rounded-2xl"
                            style={{
                              backgroundColor: COLORS.background,
                              color: COLORS.text,
                            }}
                        >
                          <Camera size={30} />
                        </div>

                        <p className="mt-4 font-semibold">
                          Choose a photo
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          PNG, JPG, JPEG, or WEBP · Maximum 5 MB
                        </p>

                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                      </label>
                  ) : (
                      <div className="relative overflow-hidden rounded-2xl bg-black">
                        <img
                            src={imagePreview}
                            alt="Post preview"
                            className="max-h-[600px] w-full object-contain"
                        />

                        <button
                            type="button"
                            onClick={removeImage}
                            aria-label="Remove photo"
                            className="absolute right-4 top-4 flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black"
                        >
                          <X size={16} />
                          Remove photo
                        </button>
                      </div>
                  )}
                </div>

                {/* Caption */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                        htmlFor="caption"
                        className="text-sm font-semibold"
                    >
                      Caption
                    </label>

                    <span className="text-xs text-gray-400">
                    {caption.length}/500
                  </span>
                  </div>

                  <textarea
                      id="caption"
                      value={caption}
                      onChange={(event) => {
                        if (event.target.value.length <= 500) {
                          setCaption(event.target.value);
                        }
                      }}
                      placeholder="Write a caption..."
                      rows={5}
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#210303] focus:ring-1 focus:ring-[#210303]"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                  <Link
                      href="/home"
                      className="rounded-xl border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </Link>

                  <button
                      type="submit"
                      className="rounded-xl px-6 py-3 text-sm font-semibold transition hover:opacity-80"
                      style={{
                        backgroundColor: COLORS.text,
                        color: COLORS.background,
                      }}
                  >
                    Publish post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
  );
}
