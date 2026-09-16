"use client";

import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import ToolCard from "./toolCard";



export default function GmailTool() {
  const { user } = useUser();
  const router = useRouter();
  const { getToken } = useAuth()
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const checkConnection = async () => {
      if (!user) {
        setConnected(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const idToken = await getToken();

        if (!apiUrl) {
          throw new Error(
            "NEXT_PUBLIC_BASE_URL belum dikonfigurasi"
          );
        }

        const response = await fetch(
          `${apiUrl}/gmail/connect`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Gagal mengecek Gmail (${response.status})`
          );
        }

        const data: {
          connected: boolean;
        } = await response.json();

        setConnected(data.connected);
      } catch (error) {
        console.error(
          "Gmail status error:",
          error
        );

        setConnected(false);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, [user, apiUrl]);

  const connect = async () => {
    try {


      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_BASE_URL belum dikonfigurasi"
        );
      }

      window.location.href = `${apiUrl}/gmail`;

    } catch (error) {
      console.error(
        "Gmail OAuth error:",
        error
      );
    }
  };
  const manage = () => {
    router.push("/email");
  };
 
  return (
    <ToolCard
      name="Gmail"
      description="Automation your gmail"
      icon={FaGoogle}
      connected={connected}
      loading={loading}
      onConnect={connect}
      onManage={manage}
    />
  );
}