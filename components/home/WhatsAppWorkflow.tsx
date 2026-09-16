"use client";

import { motion } from "framer-motion";
import { MessageCircle, Database } from "lucide-react";
import FlowLine from "./FlowLine";
import StatusDot from "./StatusDot";

const steps = [
  { title: "Customer message", status: "connected" as const },
  { title: "WhatsApp", status: "connected" as const },
  { title: "Workflow Agent", status: "running" as const },
  { title: "Knowledge base", status: "processing" as const },
  { title: "Response", status: "waiting" as const },
];

export default function WhatsAppWorkflow() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25d366]/12 text-[#1fa855]">
              <MessageCircle size={18} />
            </span>
            <h2 className="mt-5 max-w-sm text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
              Answer customers before they wait.
            </h2>
            <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
              Incoming WhatsApp messages are matched against your knowledge
              base and answered automatically, with a clean handoff when a
              human needs to step in.
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="surface-raised mx-auto w-full max-w-sm rounded-3.5xl p-5"
          >
            <div className="flex items-center gap-2 border-b border-line-light pb-3 dark:border-line-dark">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366]/15 text-[#1fa855]">
                <MessageCircle size={15} />
              </span>
              <div>
                <p className="text-[13px] font-medium text-ink-900 dark:text-surface-100">Amara T.</p>
                <StatusDot status="connected" label="Online" />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              <div className="surface-inset max-w-[80%] self-start rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-[13px] text-ink-800 dark:text-surface-200">
                Hi — does the pro plan include unlimited MCP servers?
              </div>
              <div className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-ink-900 px-3.5 py-2.5 text-[13px] text-surface-50 dark:bg-surface-100 dark:text-ink-900">
                Yes — the Pro plan includes unlimited MCP server connections.
              </div>
              <div className="flex items-center gap-2 self-start px-1 text-[11.5px] text-ink-700/60 dark:text-surface-300/60">
                <Database size={12} />
                Matched: pricing-faq.md
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line-light pt-3 dark:border-line-dark">
              <StatusDot status="running" label="Auto-replying" />
              <span className="font-mono text-[11px] text-ink-700/60 dark:text-surface-300/60">
                0.8s
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
