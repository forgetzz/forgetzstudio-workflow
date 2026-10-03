"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { CardSpotlightUi } from "./cardSpotlight";


export default function Instagram() {
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
                    `${apiUrl}/instagram/connect`,
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
                        `Gagal mengecek instagram (${response.status})`
                    );
                }

                const data = await response.json();

                setConnected(Boolean(data?.connected));
            } catch (error) {
                console.error(
                    "instagram status error:",
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

    const response = await fetch("/api/instagram");

    if (!response.ok) {
      const body = await response.text();

      throw new Error(
        `Instagram OAuth gagal (${response.status}): ${body}`
      );
    }

    const data = await response.json();

    if (!data.url) {
      throw new Error("Instagram OAuth URL tidak ditemukan");
    }

    window.location.href = data.url;
  } catch (error) {
    console.error("Instagram OAuth error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Gagal menghubungkan Instagram"
    );
  }
};
    const manage = () => {
        router.push("/instagram");
    };

    return (
        < CardSpotlightUi
            name="instagram"
            description="Instagram Automation"
            icon={FaInstagram}
            connected={connected}
            loading={loading}
            onConnect={connect}
            onManage={manage}
        />
    );
}