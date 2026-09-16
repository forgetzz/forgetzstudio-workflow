"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Bot,  Play, Save, GripVertical, Settings2, Globe } from "lucide-react";
import { FaGithubSquare } from "react-icons/fa";
import { cn } from "@/utils";
import StatusDot from "./StatusDot";
import FlowLine from "./FlowLine";

interface BuilderNode {
  id: string;
  kind: "trigger" | "agent" | "action";
  icon: typeof Mail;
  title: string;
  subtitle: string;
  accent: string;
  config: { label: string; value: string }[];
}

const builderNodes: BuilderNode[] = [
  {
    id: "trigger",
    kind: "trigger",
    icon: Mail,
    title: "Gmail: new email",
    subtitle: "Trigger",
    accent: "#ea4335",
    config: [
      { label: "Account", value: "support@northline.io" },
      { label: "Filter", value: "label:inbox is:unread" },
      { label: "Poll interval", value: "30s" },
    ],
  },
  {
    id: "agent",
    kind: "agent",
    icon: Bot,
    title: "AI Agent: analyze email",
    subtitle: "Agent step",
    accent: "#7c6ff0",
    config: [
      { label: "Model", value: "workflow-agent-v2" },
      { label: "Task", value: "Classify intent + summarize" },
      { label: "Output", value: "JSON: { intent, summary }" },
    ],
  },
  {
    id: "action",
    kind: "action",
    icon: Globe,
    title: "GitHub: create issue",
    subtitle: "Action",
    accent: "#8b96a5",
    config: [
      { label: "Repository", value: "northline/support" },
      { label: "Title", value: "{{summary}}" },
      { label: "Labels", value: "auto-triaged" },
    ],
  },
];

const logs = [
  { time: "12:04:01", text: "Trigger fired — new message from priya@northline.io" },
  { time: "12:04:02", text: "AI Agent classified intent: feature request" },
  { time: "12:04:03", text: "GitHub issue #511 created" },
  { time: "12:04:03", text: "Run completed in 2.1s" },
];

export default function WorkflowBuilder() {
  const [selected, setSelected] = useState<string>("agent");
  const activeNode = builderNodes.find((n) => n.id === selected) ?? builderNodes[0];

  return (
    <section id="workflow-builder" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
            A builder that looks like what you'll actually ship.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
            Arrange triggers, agents, and actions on a canvas, then watch each
            run execute step by step.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="surface-raised mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-3.5xl"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-line-light px-5 py-3.5 dark:border-line-dark">
            <span className="text-[13.5px] font-medium text-ink-900 dark:text-surface-100">
              Workflow Builder — support-triage
            </span>
            <div className="flex items-center gap-2">
              <button className="surface-raised-sm flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-ink-800 dark:text-surface-200">
                <Save size={13} />
                Save
              </button>
              <button className="surface-raised-sm flex items-center gap-1.5 rounded-full bg-ink-900 px-3.5 py-1.5 text-[12.5px] font-medium text-surface-50 dark:bg-surface-100 dark:text-ink-900">
                <Play size={13} />
                Run
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
            {/* Canvas */}
            <div
              className="p-5 sm:p-8"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(11,13,16,0.08) 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            >
              <div className="mx-auto flex max-w-sm flex-col items-stretch">
                {builderNodes.map((node, i) => (
                  <div key={node.id} className="flex flex-col items-center">
                    <button
                      onClick={() => setSelected(node.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
                        selected === node.id
                          ? "surface-raised border-transparent"
                          : "surface-raised-sm border-transparent hover:-translate-y-0.5"
                      )}
                    >
                      <GripVertical size={14} className="shrink-0 text-ink-700/30 dark:text-surface-300/30" />
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${node.accent}1F`, color: node.accent }}
                      >
                        <node.icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink-900 dark:text-surface-100">
                          {node.title}
                        </span>
                        <span className="font-mono text-[10.5px] uppercase tracking-tight text-ink-700/50 dark:text-surface-300/50">
                          {node.subtitle}
                        </span>
                      </span>
                      <Settings2 size={14} className="shrink-0 text-ink-700/30 dark:text-surface-300/30" />
                    </button>
                    {i < builderNodes.length - 1 && (
                      <FlowLine direction="vertical" length={22} color="#9aa2ad" />
                    )}
                  </div>
                ))}
              </div>

              {/* Execution log */}
              <div className="surface-inset mx-auto mt-8 max-w-sm rounded-2xl p-4">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-700/70 dark:text-surface-300/70">
                    run logs
                  </span>
                  <StatusDot status="connected" label="Completed" />
                </div>
                <div className="space-y-1.5">
                  {logs.map((log) => (
                    <div key={log.time + log.text} className="flex gap-2.5 text-[11.5px]">
                      <span className="shrink-0 font-mono text-ink-700/45 dark:text-surface-300/45">
                        {log.time}
                      </span>
                      <span className="text-ink-800 dark:text-surface-200">{log.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Config panel */}
            <div className="border-t border-line-light bg-surface-50/60 p-5 dark:border-line-dark dark:bg-ink-950/40 sm:p-8 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${activeNode.accent}1F`, color: activeNode.accent }}
                >
                  <activeNode.icon size={15} />
                </span>
                <div>
                  <p className="text-[13px] font-medium text-ink-900 dark:text-surface-100">
                    {activeNode.title}
                  </p>
                  <p className="font-mono text-[10.5px] uppercase tracking-tight text-ink-700/50 dark:text-surface-300/50">
                    Node configuration
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {activeNode.config.map((field) => (
                  <div key={field.label}>
                    <label className="font-mono text-[10.5px] uppercase tracking-tight text-ink-700/55 dark:text-surface-300/55">
                      {field.label}
                    </label>
                    <div className="surface-inset mt-1.5 rounded-lg px-3 py-2 text-[12.5px] text-ink-800 dark:text-surface-200">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line-light pt-4 dark:border-line-dark">
                <StatusDot status="running" label="Ready" />
                <span className="font-mono text-[11px] text-ink-700/55 dark:text-surface-300/55">
                  node {builderNodes.findIndex((n) => n.id === selected) + 1} / {builderNodes.length}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
