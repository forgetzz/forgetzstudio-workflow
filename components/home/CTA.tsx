"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter()
  const goToDhasboard = () => router.push("/home")
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="surface-raised mx-auto flex w-full max-w-4xl flex-col items-center rounded-3.5xl px-6 py-14 text-center sm:px-14"
        >
          <h2 className="max-w-lg text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
            Turn your tools into workflows.
          </h2>
          <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
            Connect your services, build powerful automations, and let
            ForgetzStudio handle the repetitive work.
          </p>
          <div id="start" className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
            onClick={goToDhasboard}
           
              className="surface-raised-sm inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-[14px] font-semibold text-surface-50 transition-transform active:scale-[0.97] dark:bg-surface-100 dark:text-ink-900"
            >
              Start building
              <ArrowRight size={15} />
            </button>
            <a
              href="#developers"
              className="surface-raised-sm inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium text-ink-800 dark:text-surface-200"
            >
              <BookOpen size={15} />
              View documentation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
