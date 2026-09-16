"use client";

import { cn } from "@/utils";

;

export type StatusKind = "connected" | "running" | "waiting" | "processing" | "error";

const statusConfig: Record<StatusKind, { color: string; label: string; pulse: boolean }> = {
  connected: { color: "#25d366", label: "Connected", pulse: false },
  running: { color: "#22b8cf", label: "Running", pulse: true },
  processing: { color: "#f5a524", label: "Processing", pulse: true },
  waiting: { color: "#9aa2ad", label: "Waiting", pulse: false },
  error: { color: "#ef4444", label: "Error", pulse: false },
};

export default function StatusDot({
  status,
  label,
  className,
}: {
  status: StatusKind;
  label?: string;
  className?: string;
}) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-[11px] tracking-tight text-ink-700 dark:text-surface-300", className)}>
      <span className="relative flex h-1.5 w-1.5">
        {config.pulse && (
          <span
            className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full"
            style={{ backgroundColor: config.color }}
          />
        )}
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: config.color }}
        />
      </span>
      {label ?? config.label}
    </span>
  );
}
