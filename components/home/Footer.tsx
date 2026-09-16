import { Workflow } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Product", href: "#product" },
      { label: "Workflow", href: "#workflow-builder" },
      { label: "Integrations", href: "#integrations" },
      { label: "MCP", href: "#mcp" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Developers", href: "#developers" },
      { label: "Documentation", href: "#developers" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="pb-10 pt-16 sm:pt-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-raised rounded-3.5xl p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="flex items-center gap-2">
                <span className="surface-inset flex h-8 w-8 items-center justify-center rounded-xl text-ink-900 dark:text-surface-100">
                  <Workflow size={16} strokeWidth={2.25} />
                </span>
                <span className="text-[15px] font-semibold tracking-tight text-ink-900 dark:text-surface-100">
                  ForgetzStudio
                </span>
              </a>
              <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-700/75 dark:text-surface-300/75">
                Workflow automation for modern teams and developers.
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[11px] uppercase tracking-tight text-ink-700/55 dark:text-surface-300/55">
                  {col.title}
                </h4>
                <ul className="mt-3.5 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] text-ink-700/85 hover:text-ink-900 dark:text-surface-300/85 dark:hover:text-surface-50"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-line-light pt-6 dark:border-line-dark sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[12.5px] text-ink-700/60 dark:text-surface-300/60">
              © {new Date().getFullYear()} ForgetzStudio. All rights reserved.
            </span>
            <span className="font-mono text-[11px] text-ink-700/50 dark:text-surface-300/50">
              status.forgetzstudio.dev — all systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
