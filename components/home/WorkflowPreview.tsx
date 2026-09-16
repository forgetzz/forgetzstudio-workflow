"use client";

import { motion } from "framer-motion";
import {  Boxes, Bot, Mail, Globe, Globe2 } from "lucide-react";

import { StatusKind } from "./StatusDot";
import NodeCard from "./NodeCard";
import FlowLine from "./FlowLine";


const nodes: {
  icon: typeof Globe;
  title: string;
  subtitle: string;
  status: StatusKind;
  accentColor: string;
}[] = [
  { icon: Globe, title: "Instagram", subtitle: "New comment", status: "connected", accentColor: "#e1306c" },
  { icon: Boxes, title: "MCP Server", subtitle: "social-toolkit", status: "running", accentColor: "#22b8cf" },
  { icon: Bot, title: "AI Agent", subtitle: "Classifying intent", status: "processing", accentColor: "#7c6ff0" },
  { icon: Mail, title: "Gmail", subtitle: "Summary drafted", status: "waiting", accentColor: "#ea4335" },
  { icon: Globe2, title: "GitHub", subtitle: "Follow-up issue", status: "waiting", accentColor: "#8b96a5" },
];

export default function WorkflowPreview() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="surface-raised mx-auto w-full max-w-5xl rounded-3.5xl p-5 sm:p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-[12px] text-ink-700/70 dark:text-surface-300/70">
              workflow / social-listener.run
            </span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-[#25d366]" />
                <span className="relative h-2 w-2 rounded-full bg-[#25d366]" />
              </span>
              <span className="font-mono text-[11px] text-ink-700/70 dark:text-surface-300/70">
                live
              </span>
            </span>
          </div>

          {/* Desktop: horizontal chain */}
          <div className="hidden items-center lg:flex">
            {nodes.map((node, i) => (
              <div key={node.title} className="flex flex-1 items-center">
                <NodeCard
                  icon={node.icon}
                  title={node.title}
                  subtitle={node.subtitle}
                  status={node.status}
                  accentColor={node.accentColor}
                  className="w-full"
                  compact
                />
                {i < nodes.length - 1 && (
                  <FlowLine direction="horizontal" length={28} color="#9aa2ad" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile / tablet: vertical stack */}
          <div className="flex flex-col items-stretch lg:hidden">
            {nodes.map((node, i) => (
              <div key={node.title} className="flex flex-col items-center">
                <NodeCard
                  icon={node.icon}
                  title={node.title}
                  subtitle={node.subtitle}
                  status={node.status}
                  accentColor={node.accentColor}
                  className="w-full"
                />
                {i < nodes.length - 1 && (
                  <FlowLine direction="vertical" length={24} color="#9aa2ad" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
