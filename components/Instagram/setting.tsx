"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { BiLogoFacebook, BiLogoTiktok, BiLogoYoutube } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

type Platform = "instagram" | "facebook" | "tiktok" | "threads" | "Youtube";

interface PlatformConnection {
  platform: Platform;
  connected: boolean;
  username?: string;
  connected_at?: string;
  expires_at?: string;
}

interface PlatformMeta {
  id: Platform;
  label: string;
  description: string;
  icon: ReactNode;
  color: string;
}

const PLATFORMS: PlatformMeta[] = [
  {
    id: "facebook",
    label: "Facebook",
    description: "Cross-post konten ke Halaman Facebook kamu.",
    icon: <BiLogoFacebook />,
    color: "#1877F2",
  },
  {
    id: "tiktok",
    label: "TikTok",
    description: "Publish video langsung ke akun TikTok.",
    icon: <BiLogoTiktok />,
    color: "#010101",
  },
  {
    id: "threads",
    label: "Threads",
    description: "Cross-post teks dan media ke Threads.",
    icon: <FaGlobe />,
    color: "#000000",
  },
  {
    id: "Youtube",
    label: "Youtube",
    description: "Cross-post teks dan media ke Threads.",
    icon: <BiLogoYoutube />,
    color: "#000000",
  }
];

const formatDate = (value?: string) => {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

export default function Setting() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [connections, setConnections] = useState<
    Partial<Record<Platform, PlatformConnection>>
  >({});
  const [checkingThreads, setCheckingThreads] = useState(true);
  const [checkingTiktok, setCheckingTiktok] = useState(true);

  const [error, setError] = useState("");
  const [connecting, setConnecting] = useState<Platform | null>(null);
  const [revoking, setRevoking] = useState<Platform | null>(null);
  const [confirmRevoke, setConfirmRevoke] = useState<Platform | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const checkTiktokConnection = async () => {
      if (!isLoaded) return;

      if (!isSignedIn || !user) {
        setCheckingThreads(false);
        return;
      }

      try {
        setCheckingThreads(true);

        if (!BASE_URL) {
          throw new Error("NEXT_PUBLIC_BASE_URL belum dikonfigurasi");
        }

        const token = await getToken();
        if (!token) {
          throw new Error("Clerk token tidak ditemukan");
        }

        const response = await fetch(`${BASE_URL}/threads/connect`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Gagal mengecek threads (${response.status})`);
        }

        const data = await response.json();

        setConnections((prev) => ({
          ...prev,
          threads: {
            platform: "threads",
            connected: Boolean(data?.connected),
            username: data?.username,
            connected_at: data?.connected_at,
            expires_at: data?.expires_at,
          },
        }));
      } catch (err) {
        console.error("Threads status error:", err);
        setConnections((prev) => ({
          ...prev,
          threads: { platform: "threads", connected: false },
        }));
      } finally {
        setCheckingTiktok(false);
      }
    };

    checkTiktokConnection();
  }, [isLoaded, isSignedIn, user, getToken]);







  useEffect(() => {
    const checkThreadsConnection = async () => {
      if (!isLoaded) return;

      if (!isSignedIn || !user) {
        setCheckingThreads(false);
        return;
      }

      try {
        setCheckingThreads(true);

        if (!BASE_URL) {
          throw new Error("NEXT_PUBLIC_BASE_URL belum dikonfigurasi");
        }

        const token = await getToken();
        if (!token) {
          throw new Error("Clerk token tidak ditemukan");
        }

        const response = await fetch(`${BASE_URL}/threads/connect`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Gagal mengecek threads (${response.status})`);
        }

        const data = await response.json();

        setConnections((prev) => ({
          ...prev,
          threads: {
            platform: "threads",
            connected: Boolean(data?.connected),
            username: data?.username,
            connected_at: data?.connected_at,
            expires_at: data?.expires_at,
          },
        }));
      } catch (err) {
        console.error("Threads status error:", err);
        setConnections((prev) => ({
          ...prev,
          threads: { platform: "threads", connected: false },
        }));
      } finally {
        setCheckingThreads(false);
      }
    };

    checkThreadsConnection();
  }, [isLoaded, isSignedIn, user, getToken]);

  const handleConnect = async (platform: Platform) => {
    try {
      setConnecting(platform);
      setError("");

      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token tidak ditemukan");
      }

      const response = await fetch(`${BASE_URL}/${platform}/connect`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();

      if (!response.ok) {
        let message = `Gagal menghubungkan ${platform} (${response.status})`;
        try {
          const errorData = JSON.parse(text);
          if (errorData?.message) {
            message = Array.isArray(errorData.message)
              ? errorData.message.join(", ")
              : errorData.message;
          }
        } catch {
          // response bukan JSON, gunakan pesan default
        }
        throw new Error(message);
      }

      const result = JSON.parse(text) as { url?: string };

      if (result.url) {
        window.location.href = result.url;
        return;
      }

      throw new Error("URL otorisasi tidak ditemukan pada response");
    } catch (err) {
      console.error(`Connect ${platform} error:`, err);
      setError(
        err instanceof Error ? err.message : `Gagal menghubungkan ${platform}`
      );
      setConnecting(null);
    }
  };

  const handleRevoke = async (platform: Platform) => {
    try {
      setRevoking(platform);
      setError("");

      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token tidak ditemukan");
      }

      const response = await fetch(`${BASE_URL}/${platform}/disconnect`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        let message = `Gagal memutus koneksi ${platform} (${response.status})`;
        try {
          const errorData = JSON.parse(text);
          if (errorData?.message) {
            message = Array.isArray(errorData.message)
              ? errorData.message.join(", ")
              : errorData.message;
          }
        } catch {
          // response bukan JSON, gunakan pesan default
        }
        throw new Error(message);
      }

      setConnections((prev) => ({
        ...prev,
        [platform]: { platform, connected: false },
      }));

      setToast(
        `${PLATFORMS.find((p) => p.id === platform)?.label} berhasil diputus dan token dicabut.`
      );
      setTimeout(() => setToast(""), 3500);
    } catch (err) {
      console.error(`Revoke ${platform} error:`, err);
      setError(
        err instanceof Error ? err.message : `Gagal memutus koneksi ${platform}`
      );
    } finally {
      setRevoking(null);
      setConfirmRevoke(null);
    }
  };

  const anyConnected = PLATFORMS.some((p) => connections[p.id]?.connected);

  return (
    <main className="min-h-screen p-3 sm:p-6 md:p-10 text-black">
      <div className="mx-auto w-full space-y-4 sm:space-y-6">
        <div className="px-1">
          <h1 className="text-xl font-bold sm:text-2xl">Settings</h1>
          <p className="mt-1 text-sm text-black">
            Kelola platform yang terhubung untuk cross-posting.
          </p>
        </div>

        {error && (
          <div className="neu-inset flex items-start gap-3 rounded-xl p-4 text-sm text-red-500">
            <span>⚠️</span>
            <p className="min-w-0 flex-1">{error}</p>
          </div>
        )}

        {toast && (
          <div className="neu-inset flex items-start gap-3 rounded-xl p-4 text-sm text-green-600 dark:text-green-400">
            <span>✓</span>
            <p className="min-w-0 flex-1">{toast}</p>
          </div>
        )}

        <section className="neu p-4 sm:p-6">
          <div className="mb-4 sm:mb-5">
            <h2 className="text-sm font-bold sm:text-base">
              Cross-posting Platforms
            </h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Hubungkan akunmu agar konten bisa dipublikasikan ke beberapa platform sekaligus.
            </p>
          </div>

          <div className="space-y-3">
            {PLATFORMS.map((meta) => {
              const conn = connections[meta.id];
              const isConnected = Boolean(conn?.connected);
              const isConnecting = connecting === meta.id;
              const isRevoking = revoking === meta.id;
              const isConfirming = confirmRevoke === meta.id;
              const isCheckingStatus = meta.id === "threads" && checkingThreads;

              return (
                <div key={meta.id} className="neu-inset rounded-xl p-3 sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="neu-button flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white sm:h-12 sm:w-12 sm:text-sm z-50"
                        style={{ backgroundColor: meta.color }}
                      >
                        <h1 className="text-3xl">{meta.icon}</h1>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold sm:text-base">
                            {meta.label}
                          </p>

                          {isConnected && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-600 dark:text-green-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Connected
                            </span>
                          )}
                        </div>

                        {isCheckingStatus ? (
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            Mengecek status...
                          </p>
                        ) : isConnected ? (
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {conn?.username ? `@${conn.username}` : "Terhubung"}
                            {formatDate(conn?.connected_at) &&
                              ` · sejak ${formatDate(conn?.connected_at)}`}
                          </p>
                        ) : (
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {meta.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 justify-end">
                      {isConnected ? (
                        isConfirming ? (
                          <div className="flex w-full gap-2 sm:w-auto">
                            <button
                              type="button"
                              onClick={() => setConfirmRevoke(null)}
                              className="neu-button flex-1 px-3 py-2 text-xs font-semibold sm:flex-none sm:px-4"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRevoke(meta.id)}
                              disabled={isRevoking}
                              className="neu-button flex-1 px-3 py-2 text-xs font-semibold text-red-500 disabled:opacity-50 sm:flex-none sm:px-4"
                            >
                              {isRevoking ? "Memutus..." : "Ya, putuskan"}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmRevoke(meta.id)}
                            className="neu-button w-full px-4 py-2 text-xs font-semibold text-red-500 sm:w-auto"
                          >
                            Revoke access
                          </button>
                        )
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleConnect(meta.id)}
                          disabled={isConnecting || isCheckingStatus}
                          className="neu-button w-full px-4 py-2 text-xs font-semibold disabled:opacity-50 sm:w-auto"
                        >
                          {isConnecting ? "Menghubungkan..." : "Connect"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="neu p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-red-500 sm:text-base">
              Danger Zone
            </h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Memutus semua koneksi akan mencabut seluruh access token dan menghentikan cross-posting ke semua platform.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              PLATFORMS.filter((p) => connections[p.id]?.connected).forEach((p) =>
                handleRevoke(p.id)
              );
            }}
            disabled={!anyConnected}
            className="neu-button w-full px-4 py-2.5 text-sm font-semibold text-red-500 disabled:opacity-40 sm:w-auto"
          >
            Revoke semua akses
          </button>
        </section>
      </div>
    </main>
  );
}
