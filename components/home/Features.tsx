"use client";

import { features } from "@/utils/data";
import { motion } from "framer-motion";


export default function Features() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
            Everything a workflow needs.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="surface-raised-sm rounded-2.5xl p-6 transition-shadow hover:shadow-neu-light dark:hover:shadow-neu-dark"
            >
              <span className="surface-inset flex h-10 w-10 items-center justify-center rounded-xl text-ink-900 dark:text-surface-100">
                <feature.icon size={17} />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-ink-900 dark:text-surface-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-700/75 dark:text-surface-300/75">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
