"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import ToolCard from "./toolCard";

export default function Github() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const router = useRouter();

  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
useEffect(() => {
  const checkConnection = async () => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setConnected(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_BASE_URL belum dikonfigurasi"
        );
      }

      const token = await getToken();

      if (!token) {
        throw new Error(
          "Clerk token tidak ditemukan"
        );
      }

      const response = await fetch(
        `${apiUrl}/github/connect`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Gagal mengecek GitHub (${response.status})`
        );
      }

      const data = await response.json();

      setConnected(Boolean(data?.connected));
    } catch (error) {
      console.error(
        "GitHub status error:",
        error
      );

      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  checkConnection();
}, [
  isLoaded,
  isSignedIn,
  user,
  getToken,
  apiUrl,
]);

const connect = async () => {
  try {
    if (!isSignedIn || !user) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    if (!apiUrl) {
      throw new Error(
        "NEXT_PUBLIC_BASE_URL belum dikonfigurasi"
      );
    }

    window.location.href = `${apiUrl}/github`;
  } catch (error) {
    console.error("GitHub OAuth error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Gagal menghubungkan GitHub"
    );
  }
};
  const manage = () => {
    router.push("/github");
  };

  return (
    <ToolCard
      name="GitHub"
      description="Access repositories"
      icon={FaGithub}
      connected={connected}
      loading={loading}
      onConnect={connect}
      onManage={manage}
    />
  );
}