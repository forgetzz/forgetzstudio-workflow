"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import StatusDot, { type StatusKind } from "./StatusDot";
import { cn } from "@/utils";


export default function NodeCard({
  icon: Icon,
  title,
  subtitle,
  status,
  accentColor,
  className,
  compact = false,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  status: StatusKind;
  accentColor?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "surface-raised-sm flex items-center gap-3 rounded-2xl px-4",
        compact ? "py-2.5" : "py-3.5",
        className
      )}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor: accentColor ? `${accentColor}1F` : "rgba(107,114,128,0.12)",
          color: accentColor ?? "#6b7280",
        }}
      >
        <Icon size={17} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[13.5px] font-medium text-ink-900 dark:text-surface-100">
          {title}
        </span>
        {subtitle && (
          <span className="truncate text-[11.5px] text-ink-700/70 dark:text-surface-300/70">
            {subtitle}
          </span>
        )}
        <StatusDot status={status} className="mt-0.5" />
      </span>
    </motion.div>
  );
}
