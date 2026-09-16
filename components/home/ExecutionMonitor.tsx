"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/utils";
import StatusDot, { StatusKind } from "./StatusDot";


const baseSteps = [
  { title: "Gmail trigger" },
  { title: "AI Agent analysis" },
  { title: "GitHub action" },
  { title: "WhatsApp notification" },
];

// Each frame represents the status of all 4 steps at a moment in the run.
const frames: StatusKind[][] = [
  ["running", "waiting", "waiting", "waiting"],
  ["connected", "running", "waiting", "waiting"],
  ["connected", "connected", "running", "waiting"],
  ["connected", "connected", "connected", "running"],
  ["connected", "connected", "connected", "connected"],
];

export default function ExecutionMonitor() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const statuses = frames[frame];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
            Watch every run as it happens.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
            Each step reports its status the moment it changes, so you always
            know exactly where a workflow is.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="surface-raised mx-auto mt-12 w-full max-w-lg rounded-3.5xl p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13px] font-medium text-ink-900 dark:text-surface-100">
              <Activity size={15} />
              Workflow execution
            </span>
            <span className="font-mono text-[11px] text-ink-700/60 dark:text-surface-300/60">
              run #{1042 + frame}
            </span>
          </div>

          <div className="space-y-1">
            {baseSteps.map((step, i) => {
              const status = statuses[i];
              const done = status === "connected";
              return (
                <div
                  key={step.title}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3.5 py-3 transition-colors",
                    status === "running" && "surface-inset"
                  )}
                >
                  <span
                    className={cn(
                      "text-[13.5px] transition-colors",
                      done
                        ? "text-ink-900 dark:text-surface-100"
                        : "text-ink-700/70 dark:text-surface-300/70"
                    )}
                  >
                    {step.title}
                  </span>
                  <StatusDot
                    status={status}
                    label={done ? "Completed" : status === "running" ? "Running" : "Waiting"}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
