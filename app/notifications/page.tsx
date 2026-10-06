import Link from "next/link";

export default function NotificationsPage() {
  return (
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-4">
            <Link
                href="/home"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-100"
            >
              ←
            </Link>

            <h1 className="text-xl font-bold text-gray-900">
              Notifications
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-8">
          {/* Notification list */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Recent activity
              </h2>
            </div>

            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
                🔔
              </div>

              <h2 className="mt-5 text-lg font-semibold text-gray-900">
                You're all caught up
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                When someone follows you, likes your posts, or
                comments on something you shared, you'll see it
                here.
              </p>

              <Link
                  href="/search"
                  className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Find people
              </Link>
            </div>
          </section>
        </div>
      </main>
  );
}