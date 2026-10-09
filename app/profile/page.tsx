
"use client";

import { useEffect, useRef, useState } from "react";
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
  Pencil,
  X,
  Check,
} from "lucide-react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string | null;
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

export default function ProfilePage() {
  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [bio, setBio] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();

        if (!response.ok || !data.user) {
          setError("Please sign in to view your profile.");
          return;
        }

        setUser(data.user);
        setBio(data.user.bio ?? "");
      } catch {
        setError("Unable to load your profile.");
      }
    }

    loadUser();
  }, []);

  function choosePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your profile photo must be 5 MB or smaller.");
      return;
    }

    setPhotoFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoPreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  function cancelEditing() {
    setEditing(false);
    setBio(user?.bio ?? "");
    setPhotoFile(null);
    setPhotoPreview("");
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("bio", bio);

      if (photoFile) {
        formData.append("avatar", photoFile);
      }

      const response = await fetch("/api/profile", {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to save your profile.");
        return;
      }

      setUser(data.user);
      setBio(data.user.bio ?? "");
      setPhotoFile(null);
      setPhotoPreview("");
      setEditing(false);
      setSuccess("Your profile has been updated.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setError("Unable to connect to Social Hub.");
    } finally {
      setSaving(false);
    }
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
      setError("Unable to sign out.");
    }
  }

  const initials = user
      ? `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()
      : "?";

  const displayedPhoto = photoPreview || user?.avatarUrl;

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

        {/* Profile content */}
        <section className="min-h-screen pt-[96px] lg:ml-[260px]">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your photo and tell people a little about yourself.
            </p>

            {error && (
                <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
            )}

            {success && (
                <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                  {success}
                </div>
            )}

            {!user ? (
                <div className="py-16 text-center text-sm text-gray-500">
                  Loading profile...
                </div>
            ) : (
                <>
                  <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                      {/* Profile photo */}
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          {displayedPhoto ? (
                              <img
                                  src={displayedPhoto}
                                  alt="Your profile"
                                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                              />
                          ) : (
                              <div
                                  className="flex h-28 w-28 items-center justify-center rounded-full text-3xl font-bold"
                                  style={{
                                    backgroundColor: COLORS.background,
                                    color: COLORS.text,
                                  }}
                              >
                                {initials}
                              </div>
                          )}

                          {editing && (
                              <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  aria-label="Choose profile photo"
                                  className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white"
                                  style={{
                                    backgroundColor: COLORS.text,
                                    color: COLORS.background,
                                  }}
                              >
                                <Camera size={18} />
                              </button>
                          )}
                        </div>

                        {editing && (
                            <>
                              <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="text-sm font-semibold hover:underline"
                                  style={{ color: COLORS.text }}
                              >
                                Change photo
                              </button>

                              <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={choosePhoto}
                                  className="hidden"
                              />

                              <p className="text-xs text-gray-500">
                                Image, maximum 5 MB
                              </p>
                            </>
                        )}
                      </div>

                      {/* User details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h2 className="text-2xl font-bold">
                              {user.firstName} {user.lastName}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                              @{user.username}
                            </p>
                          </div>

                          {!editing && (
                              <button
                                  type="button"
                                  onClick={() => {
                                    setError("");
                                    setSuccess("");
                                    setEditing(true);
                                  }}
                                  className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
                              >
                                <Pencil size={16} />
                                Edit profile
                              </button>
                          )}
                        </div>

                        {editing ? (
                            <form onSubmit={saveProfile} className="mt-6">
                              <label
                                  htmlFor="bio"
                                  className="mb-2 block text-sm font-semibold"
                              >
                                Bio
                              </label>

                              <textarea
                                  id="bio"
                                  value={bio}
                                  onChange={(event) => setBio(event.target.value)}
                                  placeholder="Tell people a little about yourself..."
                                  maxLength={300}
                                  rows={4}
                                  className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-sm text-black outline-none focus:border-[#210303] focus:ring-1 focus:ring-[#210303]"
                              />

                              <p className="mt-1 text-right text-xs text-gray-500">
                                {bio.length}/300 characters
                              </p>

                              <div className="mt-4 flex flex-wrap gap-3">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
                                    style={{
                                      backgroundColor: COLORS.text,
                                      color: COLORS.background,
                                    }}
                                >
                                  <Check size={17} />
                                  {saving ? "Saving..." : "Save changes"}
                                </button>

                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    disabled={saving}
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                                >
                                  <X size={17} />
                                  Cancel
                                </button>
                              </div>
                            </form>
                        ) : (
                            <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                              {user.bio || "No bio yet. Add a little about yourself!"}
                            </p>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="mt-8">
                    <div className="border-b border-black/10">
                      <h2 className="pb-4 text-sm font-semibold uppercase tracking-wide">
                        Posts
                      </h2>
                    </div>

                    <div className="py-16 text-center">
                      <div
                          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                          style={{
                            backgroundColor: COLORS.background,
                            color: COLORS.text,
                          }}
                      >
                        <PlusSquare size={28} />
                      </div>

                      <h3 className="mt-5 font-semibold">No posts yet</h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Share your first post with the Social Hub community.
                      </p>

                      <Link
                          href="/create-post"
                          className="mt-5 inline-block rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-80"
                          style={{
                            backgroundColor: COLORS.text,
                            color: COLORS.background,
                          }}
                      >
                        Create a post
                      </Link>
                    </div>
                  </section>
                </>
            )}
          </div>
        </section>
      </main>
  );
}
