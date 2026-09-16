"use client";

import { motion } from "framer-motion";
import { Bot, Boxes, Mail, Globe2 } from "lucide-react";
import { StatusKind } from "./StatusDot";
import NodeCard from "./NodeCard";
import FlowLine from "./FlowLine";


const servers: {
  server: { title: string; status: StatusKind };
  tool: { icon: typeof Mail; title: string; status: StatusKind; accentColor: string };
}[] = [
  {
    server: { title: "MCP Server A", status: "connected" },
    tool: { icon: Mail, title: "Gmail", status: "waiting", accentColor: "#ea4335" },
  },
  {
    server: { title: "MCP Server B", status: "running" },
    tool: { icon: Globe2, title: "GitHub", status: "running", accentColor: "#8b96a5" },
  },
  {
    server: { title: "MCP Server C", status: "processing" },
    tool: { icon: Globe2, title: "Custom API", status: "processing", accentColor: "#22b8cf" },
  },
];

export default function MCPSection() {
  return (
    <section id="mcp" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h2 className="max-w-md text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
              Give your agent access to real tools.
            </h2>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
              Connect MCP servers to give your workflow agent access to
              external tools, data, and actions — without writing custom
              integration code for each one.
            </p>
            <a
              href="#developers"
              className="surface-raised-sm mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium text-ink-800 dark:text-surface-200"
            >
              Read MCP docs
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="surface-raised rounded-3.5xl p-5 sm:p-8"
          >
            <div className="flex flex-col items-center">
              <NodeCard icon={Bot} title="Workflow Agent" subtitle="Orchestrating 3 servers" status="running" accentColor="#7c6ff0" className="w-full max-w-[240px]" />

              {/* Desktop tree */}
              <div className="mt-2 hidden w-full lg:block">
                <svg viewBox="0 0 300 60" className="mx-auto h-14 w-full max-w-md" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M150 0 V18 M150 18 H50 M150 18 H150 M150 18 H250 M50 18 V50 M150 18 V50 M250 18 V50" fill="none" stroke="#9aa2ad" strokeWidth="1.5" strokeDasharray="5 5" className="animate-dash-flow" opacity={0.6} />
                </svg>
                <div className="grid grid-cols-3 gap-4">
                  {servers.map((s) => (
                    <div key={s.server.title} className="flex flex-col items-center">
                      <NodeCard icon={Boxes} title={s.server.title} status={s.server.status} accentColor="#22b8cf" compact className="w-full" />
                      <FlowLine direction="vertical" length={22} color="#9aa2ad" />
                      <NodeCard icon={s.tool.icon} title={s.tool.title} status={s.tool.status} accentColor={s.tool.accentColor} compact className="w-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile / tablet stacked chains */}
              <div className="mt-3 flex w-full flex-col gap-6 lg:hidden">
                {servers.map((s) => (
                  <div key={s.server.title} className="flex flex-col items-center">
                    <FlowLine direction="vertical" length={20} color="#9aa2ad" />
                    <NodeCard icon={Boxes} title={s.server.title} status={s.server.status} accentColor="#22b8cf" className="w-full" />
                    <FlowLine direction="vertical" length={20} color="#9aa2ad" />
                    <NodeCard icon={s.tool.icon} title={s.tool.title} status={s.tool.status} accentColor={s.tool.accentColor} className="w-full" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
