"use client";

import { accentColor, integrations } from "@/utils/data";
import { motion } from "framer-motion";
import StatusDot from "./StatusDot";

export default function Integrations() {
  return (
    <section id="integrations" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
            Connect the tools you already use.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
            Ten native integrations today, with webhooks and a REST API for
            everything else.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {integrations.map((item, i) => {
            const color = accentColor[item.accent];
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.04, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="surface-raised-sm flex flex-col gap-3 rounded-2xl p-4 transition-shadow hover:shadow-neu-light dark:hover:shadow-neu-dark"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${color}1F`, color }}
                >
                  <item.icon size={16} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium text-ink-900 dark:text-surface-100">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-ink-700/70 dark:text-surface-300/70">
                    {item.description}
                  </p>
                </div>
                <StatusDot
                  status={item.status === "Connected" ? "connected" : "waiting"}
                  label={item.status}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
