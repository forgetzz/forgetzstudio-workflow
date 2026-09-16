"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PenSquare, Bot,  AtSign, MessageCircle } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { cn } from "@/utils";


const channels = [
  { icon: PenSquare, title: "Create Post MultiPlatfrom", accent: "#6b7280" },
  { icon: Bot, title: "AI Agent", accent: "#7c6ff0" },
  { icon: FaInstagram, title: "Instagram", accent: "#e1306c" },
  { icon: FaFacebook, title: "Facebook", accent: "#1877f2" },
  { icon: AtSign, title: "Threads", accent: "#4a4a4a" },
  { icon: MessageCircle, title: "WhatsApp", accent: "#25d366" },
];

export default function SocialAutomation() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="product" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
            One workflow. Every channel.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
            Draft once, and let a single workflow publish and respond across
            every social channel your audience actually uses.
          </p>
        </div>

        {/* Interactive channel chain */}
        <div className="mt-14 flex flex-col items-center gap-0 overflow-x-auto rail-scroll sm:flex-row sm:justify-center sm:gap-0">
          {channels.map((c, i) => {
            const isActive = hovered === i;
            return (
              <div key={c.title} className="flex flex-col items-center sm:flex-row">
                <motion.button
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "flex w-40 flex-col items-center gap-2 rounded-2xl px-4 py-5 transition-shadow",
                    isActive ? "surface-raised" : "surface-raised-sm"
                  )}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
                    style={{
                      backgroundColor: isActive ? `${c.accent}26` : `${c.accent}14`,
                      color: c.accent,
                    }}
                  >
                    <c.icon size={18} />
                  </span>
                  <span className="text-[13px] font-medium text-ink-900 dark:text-surface-100">
                    {c.title}
                  </span>
                  <span
                    className="font-mono text-[10.5px] transition-colors"
                    style={{ color: isActive ? c.accent : "#9aa2ad" }}
                  >
                    {isActive ? "active" : "idle"}
                  </span>
                </motion.button>

                {i < channels.length - 1 && (
                  <div className="hidden h-px w-10 sm:block">
                    <div
                      className="h-full w-full transition-colors"
                      style={{
                        backgroundColor:
                          hovered !== null && (hovered === i || hovered === i + 1)
                            ? channels[i].accent
                            : "#d4d8df",
                      }}
                    />
                  </div>
                )}
                {i < channels.length - 1 && (
                  <div className="block h-6 w-px sm:hidden" style={{ backgroundColor: "#d4d8df" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
