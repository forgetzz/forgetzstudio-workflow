"use client";

import { motion } from "framer-motion";
import {  GitPullRequest, CheckCircle2 } from "lucide-react";
import FlowLine from "./FlowLine";
import StatusDot from "./StatusDot";


const steps = [
  { title: "GitHub issue", status: "connected" as const },
  { title: "Workflow Agent", status: "running" as const },
  { title: "Analyze issue", status: "processing" as const },
  { title: "Create task", status: "waiting" as const },
  { title: "Notify team", status: "waiting" as const },
];

const activity = [
  { time: "09:12:03", text: "Issue #482 opened by @lena-k" },
  { time: "09:12:04", text: "Workflow Agent picked up event" },
  { time: "09:12:06", text: "Labeled as bug, priority: high" },
  { time: "09:12:09", text: "Task created in linear.app" },
];

export default function GitHubWorkflow() {
  return (
    <section id="developers-preview" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          {/* Repo + log card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="surface-raised order-2 rounded-3.5xl p-5 sm:p-6 lg:order-1"
          >
            <div className="surface-raised-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 font-mono text-[12px] text-ink-700/70 dark:text-surface-300/70">
                {/* <Github size={14} /> */}
                northline/api-gateway
              </div>
              <div className="mt-3 flex items-start gap-2">
                <GitPullRequest size={16} className="mt-0.5 shrink-0 text-[#8b96a5]" />
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium text-ink-900 dark:text-surface-100">
                    #482 — Rate limiter drops valid requests under burst load
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#ea4335]/10 px-2 py-0.5 font-mono text-[10.5px] text-[#ea4335]">bug</span>
                    <span className="rounded-full bg-[#f5a524]/10 px-2 py-0.5 font-mono text-[10.5px] text-[#c98a15]">priority: high</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 px-1">
              {activity.map((a) => (
                <div key={a.time} className="flex items-start gap-3 text-[12.5px]">
                  <span className="font-mono text-ink-700/50 dark:text-surface-300/50">{a.time}</span>
                  <span className="text-ink-800 dark:text-surface-200">{a.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-line-light pt-3 dark:border-line-dark">
              <CheckCircle2 size={14} className="text-[#25d366]" />
              <span className="text-[12.5px] text-ink-700/75 dark:text-surface-300/75">
                Task created and team notified in 6.2s
              </span>
            </div>
          </motion.div>

          {/* Step chain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8b96a5]/15 text-[#5f6b7a] dark:text-[#c3ccd6]">
              {/* <Github size={18} /> */}
            </span>
            <h2 className="mt-5 max-w-sm text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
              Turn issues into tracked work automatically.
            </h2>
            <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
              When an issue is opened, a workflow reads it, decides what kind
              of work it is, creates a task, and pings the right people.
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
        </div>
      </div>
    </section>
  );
}
