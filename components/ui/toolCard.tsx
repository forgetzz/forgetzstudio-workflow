"use client";

import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

type ToolIcon = LucideIcon | IconType;

interface ToolCardProps {
  name: string;
  description: string;
  icon: ToolIcon;
  connected?: boolean;
  loading?: boolean;
  onConnect?: () => void;
  onManage?: () => void;
}

export default function ToolCard({
  name,
  description,
  icon: Icon,
  connected = false,
  loading = false,
  onConnect,
  onManage,
}: ToolCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
     
        p-6
        backdrop-blur-xl
      "
    >
      {/* ICON + STATUS */}
      <div className="flex items-center justify-between">
        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${connected
              ? "bg-green-500/20"
              : "bg-cyan-500/10"
            }
          `}
        >
          <Icon
            size={30}
            className={
              connected
                ? "text-green-400"
                : "text-cyan-300"
            }
          />
        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${loading
              ? "bg-yellow-500/20 text-yellow-300"
              : connected
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }
          `}
        >
          {loading
            ? "Checking..."
            : connected
              ? "Connected"
              : "Disconnected"}
        </span>
      </div>

      {/* NAME */}
      <h2 className="mt-5 text-xl font-semibold text-white">
        {name}
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-2 text-sm text-white/60">
        {description}
      </p>

      {/* BUTTON */}
      <button

        disabled={loading}
        onClick={
          connected
            ? onManage
            : onConnect
        }
        className={`
      neu-button
      active:neu-button-active
          mt-6
          w-full
          rounded-xl
          border
          py-3
          font-medium
          transition

          ${connected
            ? "border-green-500/20 bg-green-500/10 text-green-300"
            : "border-white/10 text-white hover:bg-white/10"
          }

          ${loading
            ? "cursor-not-allowed opacity-50"
            : ""
          }
        `}
      >
        {loading
          ? "Checking..."
          : connected
            ? "Manage"
            : "Connect"}
      </button>
    </div>
  );
}