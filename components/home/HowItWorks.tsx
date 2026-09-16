"use client";

import { howItWorks } from "@/utils/data";
import { motion } from "framer-motion";


export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
            From connection to insight, in four steps.
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="mt-14 hidden lg:block">
          <div className="relative grid grid-cols-4 gap-6">
            <div className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-line-light dark:bg-line-dark" />
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="relative flex flex-col items-start"
              >
                <span className="surface-raised-sm relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-mono text-[12px] text-ink-800 dark:text-surface-200">
                  {step.index}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink-900 dark:text-surface-50">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[15rem] text-[13.5px] leading-relaxed text-ink-700/75 dark:text-surface-300/75">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="mt-12 flex flex-col lg:hidden">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {i < howItWorks.length - 1 && (
                <span className="absolute left-5 top-10 h-full w-px bg-line-light dark:bg-line-dark" />
              )}
              <span className="surface-raised-sm relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-[12px] text-ink-800 dark:text-surface-200">
                {step.index}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-ink-900 dark:text-surface-50">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-700/75 dark:text-surface-300/75">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
