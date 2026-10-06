import Link from "next/link";

export default function WelcomePage() {
  return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-black text-white text-3xl font-bold">
              SH
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Welcome to Social Hub
            </h1>

            <p className="mt-4 text-lg text-gray-500">
              Connect, share, and discover with your community.
            </p>
          </div>

          <Link
              href="/home"
              className="mx-auto block w-full max-w-sm rounded-xl bg-black px-6 py-4 text-center font-semibold text-white transition hover:bg-gray-800"
          >
            Start using Social Hub
          </Link>
        </div>
      </main>
  );
}