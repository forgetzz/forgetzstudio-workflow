"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter()
    const goToDhasboard = () => router.push("/home")
  return (
   <section id="top" className="relative overflow-hidden pb-4 pt-20 sm:pt-44">
  {/* Animated background */}
  <div className="pointer-events-none absolute inset-0 -z-10">
    {/* Soft grid */}
    <div
      className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />

    {/* Cyan glow */}
    <motion.div
      className="absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#22b8cf]/20 blur-[100px] dark:bg-[#22b8cf]/15"
      animate={{
        x: ["-50%", "-45%", "-55%", "-50%"],
        y: [0, 30, -20, 0],
        scale: [1, 1.08, 0.95, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Purple glow */}
    <motion.div
      className="absolute left-[10%] top-[35%] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-400/10"
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -40, 30, 0],
        scale: [1, 1.15, 0.9, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Cyan secondary glow */}
    <motion.div
      className="absolute right-[5%] top-[45%] h-[260px] w-[260px] rounded-full bg-[#22b8cf]/10 blur-[90px]"
      animate={{
        x: [0, -40, 30, 0],
        y: [0, 30, -30, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Floating particles */}
    <motion.div
      className="absolute left-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#22b8cf]/60"
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <motion.div
      className="absolute right-[22%] top-[25%] h-1 w-1 rounded-full bg-violet-400/60"
      animate={{
        y: [0, 25, 0],
        opacity: [0.2, 0.9, 0.2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />

    {/* Bottom fade */}
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-ink-950" />
  </div>

  <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="surface-raised-sm inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11.5px] text-ink-700 dark:text-surface-300"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#22b8cf]" />
      Now supporting MCP tool calls
    </motion.span>

    <motion.h1
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
      className="mt-6 text-4xl font-semibold text-ink-900 dark:text-surface-50 sm:text-5xl lg:text-display-md"
    >
      Build workflows. Connect everything. Automate the work.
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
      className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-ink-700/85 dark:text-surface-300/85"
    >
      ForgetzStudio Workflow Agent connects your social media, Gmail, GitHub,
      MCP servers, and APIs into automated workflows you can build, run, and
      monitor from one place.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
      className="mt-8 flex flex-wrap items-center justify-center gap-3"
    >
      <button
        onClick={goToDhasboard}
        className="surface-raised inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-[14px] font-semibold text-surface-50 transition-transform active:scale-[0.97] dark:bg-surface-100 dark:text-ink-900"
      >
        Start building
        <ArrowRight size={15} />
      </button>

      <button
        onClick={goToDhasboard}
        className="surface-raised-sm inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium text-ink-800 dark:text-surface-200"
      >
        <PlayCircle size={16} />
        Explore workflow
      </button>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12.5px] text-ink-700/70 dark:text-surface-300/70"
    >
      <span>10 native integrations</span>
      <span className="h-1 w-1 rounded-full bg-ink-700/30 dark:bg-surface-300/30" />
      <span>Unlimited MCP servers</span>
      <span className="h-1 w-1 rounded-full bg-ink-700/30 dark:bg-surface-300/30" />
      <span>Runs on your schedule or triggers</span>
    </motion.div>
  </div>
</section>
  );
}
