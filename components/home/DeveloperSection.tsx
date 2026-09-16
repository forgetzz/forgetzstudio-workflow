"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const codeLines: { text: string; tone: "keyword" | "string" | "prop" | "plain" | "punct" }[] = [
  { text: "const workflow = {", tone: "plain" },
  { text: "  trigger: \"gmail.new_email\",", tone: "plain" },
  { text: "  actions: [", tone: "plain" },
  { text: "    \"agent.analyze\",", tone: "plain" },
  { text: "    \"github.create_issue\",", tone: "plain" },
  { text: "    \"whatsapp.notify\"", tone: "plain" },
  { text: "  ]", tone: "plain" },
  { text: "};", tone: "plain" },
];

function renderLine(text: string) {
  const stringRegex = /"(.*?)"/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = stringRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    parts.push(
      <span key={key++} className="text-[#25d366]">
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }
  parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  return parts;
}

export default function DeveloperSection() {
  return (
    <section id="developers" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900/8 text-ink-900 dark:bg-surface-100/10 dark:text-surface-100">
              <Terminal size={18} />
            </span>
            <h2 className="mt-5 max-w-md text-2xl font-semibold text-ink-900 dark:text-surface-50 sm:text-display-sm">
              Built for developers.
            </h2>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-700/80 dark:text-surface-300/80">
              Use APIs, webhooks, MCP servers, and custom integrations to
              extend your workflows past what the visual builder covers.
            </p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-ink-800 dark:text-surface-200">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-700/50 dark:bg-surface-300/50" />
                Define workflows as code and version them with your repo
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-700/50 dark:bg-surface-300/50" />
                Trigger runs from webhooks or a typed REST API
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-700/50 dark:bg-surface-300/50" />
                Register your own MCP servers as first-class actions
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="surface-raised overflow-hidden rounded-3.5xl"
          >
            <div className="flex items-center gap-2 border-b border-line-light px-5 py-3 dark:border-line-dark">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ea4335]/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5a524]/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#25d366]/50" />
              <span className="ml-2 font-mono text-[11.5px] text-ink-700/60 dark:text-surface-300/60">
                workflow.config.ts
              </span>
            </div>
            <pre className="overflow-x-auto rail-scroll p-5 font-mono text-[13px] leading-relaxed text-ink-800 dark:text-surface-200">
              {codeLines.map((line, i) => (
                <div key={i}>{renderLine(line.text)}</div>
              ))}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
