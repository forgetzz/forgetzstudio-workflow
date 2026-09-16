"use client";

import { motion } from "framer-motion";
import { Mail, Bot } from "lucide-react";
import StatusDot from "./StatusDot";
import FlowLine from "./FlowLine";


const steps = [
  { title: "New Gmail", status: "connected" as const },
  { title: "Read email", status: "connected" as const },
  { title: "AI Agent", status: "running" as const },
  { title: "Analyze", status: "processing" as const },
  { title: "Save result", status: "waiting" as const },
  { title: "Send response", status: "waiting" as const },
];

export default function GmailWorkflow() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          {/* Step chain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: "rgba(234,67,53,0.12)", color: "#ea4335" }}
            >
              <Mail size={18} />
            </span>
            <h2 className="mt-5 max-w-sm text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
              Turn every inbound email into a handled task.
            </h2>
            <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
              A workflow reads the message, has an agent analyze it, saves the
              result, and replies — without anyone touching the inbox.
            </p>

            <div className="surface-raised mt-8 flex flex-col rounded-3xl p-4">
              {steps.map((step, i) => (
                <div key={step.title} className="flex flex-col items-stretch">
                  <div className="surface-raised-sm flex items-center justify-between rounded-xl px-4 py-2.5">
                    <span className="text-[13px] font-medium text-ink-900 dark:text-surface-100">
                      {step.title}
                    </span>
                    <StatusDot status={step.status} />
                  </div>
                  {i < steps.length - 1 && <FlowLine direction="vertical" length={16} color="#9aa2ad" />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Email + agent visual */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="surface-raised rounded-3.5xl p-5 sm:p-6"
          >
            <div className="surface-raised-sm rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium text-ink-900 dark:text-surface-100">
                    Priya Nair &lt;priya@northline.io&gt;
                  </p>
                  <p className="mt-1 truncate text-[13px] text-ink-700/80 dark:text-surface-300/80">
                    Subject: API rate limit increase request
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-ink-700/60 dark:text-surface-300/60">
                  09:41
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line-light pt-3 dark:border-line-dark">
                <StatusDot status="processing" label="Reading" />
                <span className="font-mono text-[11px] text-ink-700/60 dark:text-surface-300/60">
                  step 2 / 6
                </span>
              </div>
            </div>

            <FlowLine direction="vertical" length={26} color="#9aa2ad" />

            <div className="surface-raised-sm flex items-center gap-3 rounded-2xl p-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(124,111,240,0.14)", color: "#7c6ff0" }}
              >
                <Bot size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-ink-900 dark:text-surface-100">
                  AI Agent — analyzing intent
                </p>
                <div className="surface-inset mt-2 h-1.5 w-full overflow-hidden rounded-full">
                  <motion.div
                    className="h-full rounded-full bg-[#7c6ff0]"
                    initial={{ width: "10%" }}
                    whileInView={{ width: "72%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </div>
            </div>

            <p className="mt-4 px-1 text-[12.5px] leading-relaxed text-ink-700/70 dark:text-surface-300/70">
              Classified as: <span className="font-medium text-ink-900 dark:text-surface-100">billing request</span> — routed to the billing workflow, summary saved for the team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
