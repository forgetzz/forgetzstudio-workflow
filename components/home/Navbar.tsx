"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Workflow } from "lucide-react";
import { navLinks } from "@/utils/data";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-3xl glass-panel surface-raised-sm px-4 py-2.5 sm:px-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="surface-inset flex h-8 w-8 items-center justify-center rounded-xl text-ink-900 dark:text-surface-100">
            <Workflow size={16} strokeWidth={2.25} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink-900 dark:text-surface-100">
            ForgetzStudio
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink-700 transition-colors hover:text-ink-900 dark:text-surface-300 dark:hover:text-surface-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#sign-in"
            className="rounded-full px-4 py-2 text-[13.5px] font-medium text-ink-700 hover:text-ink-900 dark:text-surface-300 dark:hover:text-surface-50"
          >
            Sign in
          </a>
          <a
            href="#start"
            className="surface-raised-sm rounded-full bg-ink-900 px-4 py-2 text-[13.5px] font-semibold text-surface-50 transition-transform active:scale-[0.97] dark:bg-surface-100 dark:text-ink-900"
          >
            Get started
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="surface-raised-sm flex h-9 w-9 items-center justify-center rounded-xl text-ink-900 dark:text-surface-100 lg:hidden"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: -8, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -8, height: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="
        mx-auto mt-2 w-full max-w-6xl overflow-hidden
        rounded-3xl
        bg-white
        px-4 py-3
        shadow-lg
        ring-1 ring-black/5
        dark:bg-ink-900
        dark:ring-white/10
        lg:hidden
      "
    >
      <div className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="
              rounded-xl px-3 py-2.5
              text-[14px] font-medium
              text-ink-900
              hover:bg-gray-100
       
              dark:hover:bg-ink-800
            "
          >
            {link.label}
          </a>
        ))}

        <div
          className="
            mt-2 flex items-center gap-2
            border-t border-gray-200 pt-3
            dark:border-ink-700
          "
        >
          <a
            href="#sign-in"
            className="
              flex-1 rounded-full
              py-2.5 text-center
              text-[13.5px] font-medium
              text-ink-900
              hover:bg-gray-100
          
              dark:hover:bg-ink-800
            "
          >
            Sign in
          </a>

          <a
            href="#start"
            className="
              flex-1 rounded-full
              bg-ink-900
              py-2.5 text-center
              text-[13.5px] font-semibold

              hover:bg-ink-800
         
              dark:hover:bg-gray-100
            "
          >
            Get started
          </a>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.header>
  );
}
