"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

export default function CreatePostPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [caption, setCaption] = useState("");

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  function removeImage() {
    setImagePreview("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("Post publishing will be connected to the database next.");
  }

  return (
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto w-full max-w-2xl">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Link
                href="/home"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100"
            >
              ←
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create a post
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Share something with the Social Hub community.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-900">
                  Photo
                </label>

                {!imagePreview ? (
                    <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition hover:border-gray-400 hover:bg-gray-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                        📷
                      </div>

                      <p className="mt-4 font-semibold text-gray-900">
                        Choose a photo
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        PNG, JPG, JPEG or WEBP
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
                          className="absolute right-4 top-4 rounded-xl bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black"
                      >
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
                      className="text-sm font-semibold text-gray-900"
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
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
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
                    className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Publish post
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
  );
}