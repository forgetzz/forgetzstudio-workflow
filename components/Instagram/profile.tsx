"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const BASE_URL = "http://localhost:3002";

/* =========================================================
   TYPES
========================================================= */

type MediaType =
  | "IMAGE"
  | "VIDEO"
  | "CAROUSEL_ALBUM"
  | "REELS"
  | "STORIES";

interface InstagramProfile {
  id: string;
  user_id?: string;
  username: string;
  name?: string;
  account_type?: string;
  followers_count?: number;
  follows_count?: number;
  media_count?: number;
  profile_picture_url?: string;
}

interface InstagramMediaChild {
  id: string;
  media_type?: MediaType;
  media_url?: string;
  thumbnail_url?: string;
}

interface InstagramMedia {
  id: string;
  media_type?: MediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  caption?: string;
  like_count?: number;
  comments_count?: number;

  owner?: {
    id: string;
  };

  children?: {
    data?: InstagramMediaChild[];
    paging?: {
      cursors?: {
        before?: string;
        after?: string;
      };
      next?: string;
      previous?: string;
    };
  };
}

interface InstagramPaging {
  cursors?: {
    before?: string;
    after?: string;
  };
  next?: string;
  previous?: string;
}

interface InstagramResponse {
  profile: InstagramProfile;
  media: InstagramMedia[];
  paging?: InstagramPaging;
}

interface InstagramBackendResponse {
  profile?: InstagramProfile;
  media?: InstagramMedia[];
  posts?: InstagramMedia[];
  paging?: InstagramPaging;
}

/* =========================================================
   HELPERS & ICONS
========================================================= */

const isVideoMedia = (mediaType?: MediaType) => {
  return (
    mediaType === "VIDEO" ||
    mediaType === "REELS" ||
    mediaType === "STORIES"
  );
};

const getMediaPreview = (media: InstagramMedia) => {
  if (isVideoMedia(media.media_type)) {
    return media.thumbnail_url ?? media.media_url;
  }
  return media.media_url;
};

const getMediaLabel = (mediaType?: MediaType) => {
  switch (mediaType) {
    case "IMAGE":
      return "Gambar";
    case "VIDEO":
      return "Video";
    case "REELS":
      return "Reels";
    case "STORIES":
      return "Story";
    case "CAROUSEL_ALBUM":
      return "Carousel";
    default:
      return "Instagram";
  }
};

// SVG Icons
const PlayIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const LayersIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
    <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

/* =========================================================
   COMPONENT
========================================================= */

export default function Profile() {
  const { getToken } = useAuth();

  const [data, setData] = useState<InstagramResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     GET PROFILE
  ===================================================== */

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token tidak ditemukan");
      }

      const response = await fetch(`${BASE_URL}/instagram/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();

      if (!response.ok) {
        let message = `Gagal mengambil profile (${response.status})`;

        try {
          const errorData = JSON.parse(text);
          if (errorData?.message) {
            message = Array.isArray(errorData.message)
              ? errorData.message.join(", ")
              : errorData.message;
          }
        } catch {
          // Response bukan JSON
        }

        throw new Error(message);
      }

      let result: InstagramBackendResponse;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Response backend bukan JSON yang valid");
      }

      const normalizedData: InstagramResponse = {
        profile: result.profile ?? {
          id: "",
          username: "",
        },
        media: Array.isArray(result.media)
          ? result.media
          : Array.isArray(result.posts)
          ? result.posts
          : [],
        paging: result.paging,
      };

      setData(normalizedData);
    } catch (err) {
      console.error("Get Instagram profile error:", err);
      setError(
        err instanceof Error ? err.message : "Gagal mengambil profile Instagram"
      );
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  /* =====================================================
     SKELETON LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen p-3 sm:p-6 md:p-10 animate-pulse">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          {/* Header Skeleton */}
          <div className="neu p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row items-center md:items-start">
              <div className="neu-inset h-28 w-28 rounded-full shrink-0 bg-gray-200/50 dark:bg-gray-700/50" />
              <div className="flex-1 space-y-4 w-full text-center md:text-left">
                <div className="h-6 w-48 bg-gray-200/60 dark:bg-gray-700/60 rounded mx-auto md:mx-0" />
                <div className="h-4 w-32 bg-gray-200/40 dark:bg-gray-700/40 rounded mx-auto md:mx-0" />
                <div className="flex justify-center md:justify-start gap-8 pt-2">
                  <div className="h-8 w-16 bg-gray-200/50 dark:bg-gray-700/50 rounded" />
                  <div className="h-8 w-16 bg-gray-200/50 dark:bg-gray-700/50 rounded" />
                  <div className="h-8 w-16 bg-gray-200/50 dark:bg-gray-700/50 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="neu p-6">
            <div className="h-6 w-24 bg-gray-200/50 dark:bg-gray-700/50 rounded mb-6" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="neu-inset aspect-square rounded-xl bg-gray-200/30 dark:bg-gray-800/30" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     ERROR STATE
  ===================================================== */

  if (error) {
    return (
      <main className="min-h-screen p-4 sm:p-6 md:p-10 flex items-center justify-center">
        <div className="mx-auto w-full max-w-lg">
          <div className="neu flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="neu-inset flex h-16 w-16 items-center justify-center rounded-full">
              <AlertIcon />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Gagal Memuat Profil
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={getProfile}
              className="neu-button px-6 py-2.5 text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200 uppercase"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!data) return null;

  const { profile } = data;
  const media = Array.isArray(data.media) ? data.media : [];

  /* =====================================================
     MAIN RENDER
  ===================================================== */

  return (
    <main className="min-h-screen p-3 sm:p-6 md:p-10 transition-colors">
      <div className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-6">

        {/* ================= PROFILE CARD ================= */}
        <section className="neu p-5 sm:p-6 md:p-8 rounded-2xl">
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row items-center md:items-start">

            {/* AVATAR */}
            <div className="relative shrink-0">
              {profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt={profile.username || "Instagram profile"}
                  className="neu-inset h-24 w-24 rounded-full object-cover p-1 sm:h-28 sm:w-28 md:h-36 md:w-36"
                />
              ) : (
                <div className="neu-inset flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-gray-600 dark:text-gray-300 sm:h-28 sm:w-28 sm:text-4xl md:h-36 md:w-36">
                  {profile.username?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="min-w-0 flex-1 w-full text-center md:text-left space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="truncate text-xl font-bold text-gray-800 dark:text-gray-100 sm:text-2xl">
                    @{profile.username || "-"}
                  </h1>
                  {profile.name && (
                    <p className="mt-0.5 truncate text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      {profile.name}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="neu-button w-full sm:w-auto px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 self-center md:self-auto"
                >
                  Edit Profil
                </button>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-2 py-2 max-w-md mx-auto md:mx-0">
                <div className="neu-inset p-2.5 rounded-xl text-center">
                  <p className="text-sm sm:text-base font-extrabold text-gray-800 dark:text-gray-100">
                    {profile.media_count ?? media.length}
                  </p>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Postingan
                  </p>
                </div>

                <div className="neu-inset p-2.5 rounded-xl text-center">
                  <p className="text-sm sm:text-base font-extrabold text-gray-800 dark:text-gray-100">
                    {profile.followers_count ?? 0}
                  </p>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Pengikut
                  </p>
                </div>

                <div className="neu-inset p-2.5 rounded-xl text-center">
                  <p className="text-sm sm:text-base font-extrabold text-gray-800 dark:text-gray-100">
                    {profile.follows_count ?? 0}
                  </p>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mengikuti
                  </p>
                </div>
              </div>

              {/* ACCOUNT TYPE BADGE */}
              {profile.account_type && (
                <div className="flex justify-center md:justify-start">
                  <span className="neu-inset inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {profile.account_type}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= MEDIA GRID ================= */}
        <section className="neu p-4 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200/40 pb-3 dark:border-gray-700/40">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">
                Postingan Media
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Konten terhubung dari Instagram
              </p>
            </div>
            <span className="neu-inset px-2.5 py-1 rounded-md text-[10px] font-semibold text-gray-500 dark:text-gray-400">
              {media.length} Ditemukan
            </span>
          </div>

          {media.length === 0 ? (
            <div className="neu-inset flex min-h-[220px] flex-col items-center justify-center rounded-xl p-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Belum ada postingan yang dapat ditampilkan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {media.map((item) => {
                const imageUrl = getMediaPreview(item);
                const isVideo = isVideoMedia(item.media_type);
                const label = getMediaLabel(item.media_type);

                const cardContent = (
                  <div className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                    {/* Media Image */}
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.caption || `${label} Instagram`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        Tidak ada pratinjau
                      </div>
                    )}

                    {/* Media Type Badge */}
                    <div className="absolute left-2 top-2 rounded-md bg-black/50 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      {label}
                    </div>

                    {/* Media Type Icons */}
                    {isVideo && (
                      <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 backdrop-blur-md shadow-sm">
                        <PlayIcon />
                      </div>
                    )}

                    {item.media_type === "CAROUSEL_ALBUM" && (
                      <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 backdrop-blur-md shadow-sm">
                        <LayersIcon />
                      </div>
                    )}

                    {/* Overlay Hover */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {item.caption && (
                        <p className="line-clamp-2 text-[11px] font-medium leading-tight text-white">
                          {item.caption}
                        </p>
                      )}
                      {item.timestamp && (
                        <p className="mt-1 text-[9px] text-gray-300">
                          {new Date(item.timestamp).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                );

                return item.permalink ? (
                  <a
                    key={item.id}
                    href={item.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-button block p-1.5 rounded-2xl transition-all"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div key={item.id} className="neu-button p-1.5 rounded-2xl">
                    {cardContent}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ================= ACCOUNT DETAILS ================= */}
        <section className="neu p-5 sm:p-6 rounded-2xl space-y-4">
          <div>
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">
              Informasi Akun Instagram
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Detail integrasi akun terhubung
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="neu-inset flex items-center justify-between p-3.5 rounded-xl">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Username
              </span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate max-w-[160px]">
                @{profile.username || "-"}
              </span>
            </div>

            <div className="neu-inset flex items-center justify-between p-3.5 rounded-xl">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Tipe Akun
              </span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                {profile.account_type || "-"}
              </span>
            </div>

            <div className="neu-inset flex items-center justify-between p-3.5 rounded-xl">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Instagram ID
              </span>
              <span
                className="text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[160px]"
                title={profile.id}
              >
                {profile.id || "-"}
              </span>
            </div>

            {profile.user_id && (
              <div className="neu-inset flex items-center justify-between p-3.5 rounded-xl">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  User ID
                </span>
                <span
                  className="text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[160px]"
                  title={profile.user_id}
                >
                  {profile.user_id}
                </span>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}