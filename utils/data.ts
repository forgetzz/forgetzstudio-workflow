import {

  Mail,
  MessageCircle,
  Webhook,
  Globe2,
  Wrench,
  AtSign,
  Boxes,
  Workflow,
  ShieldCheck,
  Share2,
  Bot,
  Activity,
  Terminal,
  type LucideIcon,
  Globe,
} from "lucide-react";

export type Accent =
  | "instagram"
  | "facebook"
  | "threads"
  | "whatsapp"
  | "gmail"
  | "github"
  | "mcp"
  | "neutral";

export const accentColor: Record<Accent, string> = {
  instagram: "#e1306c",
  facebook: "#1877f2",
  threads: "#4a4a4a",
  whatsapp: "#25d366",
  gmail: "#ea4335",
  github: "#8b96a5",
  mcp: "#22b8cf",
  neutral: "#6b7280",
};

export const accentSoft: Record<Accent, string> = {
  instagram: "rgba(225,48,108,0.12)",
  facebook: "rgba(24,119,242,0.12)",
  threads: "rgba(74,74,74,0.12)",
  whatsapp: "rgba(37,211,102,0.12)",
  gmail: "rgba(234,67,53,0.12)",
  github: "rgba(139,150,165,0.16)",
  mcp: "rgba(34,184,207,0.12)",
  neutral: "rgba(107,114,128,0.12)",
};

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Workflow", href: "#workflow-builder" },
  { label: "Integrations", href: "#integrations" },
  { label: "MCP", href: "#mcp" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
];

export interface IntegrationItem {
  name: string;
  description: string;
  status: "Connected" | "Available";
  accent: Accent;
  icon: LucideIcon;
}

export const integrations: IntegrationItem[] = [
  {
    name: "Instagram",
    description: "Publish posts, replies, and DMs from a workflow.",
    status: "Connected",
    accent: "instagram",
    icon: Globe,
  },
  {
    name: "Facebook",
    description: "Automate page posts and comment moderation.",
    status: "Connected",
    accent: "facebook",
    icon: Globe2,
  },
  {
    name: "Threads",
    description: "Cross-post and track replies automatically.",
    status: "Available",
    accent: "threads",
    icon: AtSign,
  },
  {
    name: "WhatsApp",
    description: "Route customer messages into your workflows.",
    status: "Connected",
    accent: "whatsapp",
    icon: MessageCircle,
  },
  {
    name: "Gmail",
    description: "Trigger workflows from incoming email.",
    status: "Connected",
    accent: "gmail",
    icon: Mail,
  },
  {
    name: "GitHub",
    description: "React to issues, PRs, and repository events.",
    status: "Connected",
    accent: "github",
    icon: Globe,
  },
  {
    name: "MCP Servers",
    description: "Give agents access to external tools and data.",
    status: "Connected",
    accent: "mcp",
    icon: Boxes,
  },
  {
    name: "Webhooks",
    description: "Send and receive events from any system.",
    status: "Available",
    accent: "neutral",
    icon: Webhook,
  },
  {
    name: "REST API",
    description: "Call any HTTP API as a workflow step.",
    status: "Available",
    accent: "neutral",
    icon: Globe2,
  },
  {
    name: "Custom Tools",
    description: "Wrap internal scripts as reusable actions.",
    status: "Available",
    accent: "neutral",
    icon: Wrench,
  },
];

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const features: FeatureItem[] = [
  {
    title: "Workflow automation",
    description: "Chain triggers, conditions, and actions into multi-step workflows that run on their own.",
    icon: Workflow,
  },
  {
    title: "MCP integration",
    description: "Connect MCP servers so agents can read, write, and act on real external tools.",
    icon: Boxes,
  },
  {
    title: "Social media",
    description: "Publish and respond across Instagram, Facebook, Threads, and WhatsApp from one place.",
    icon: Share2,
  },
  {
    title: "AI agent",
    description: "Drop an agent into any step to analyze input and decide what happens next.",
    icon: Bot,
  },
  {
    title: "Developer tools",
    description: "Extend workflows with APIs, webhooks, and custom integrations you already maintain.",
    icon: Terminal,
  },
  {
    title: "Monitoring",
    description: "Watch every run in real time and get alerted the moment something breaks.",
    icon: Activity,
  },
];

export interface HowItWorksStep {
  index: string;
  title: string;
  description: string;
}

export const howItWorks: HowItWorksStep[] = [
  {
    index: "01",
    title: "Connect",
    description: "Link the services your team already uses — social accounts, inboxes, repos, and APIs.",
  },
  {
    index: "02",
    title: "Build",
    description: "Arrange triggers and actions on the canvas to describe exactly what should happen.",
  },
  {
    index: "03",
    title: "Automate",
    description: "Publish the workflow and let it run whenever the trigger condition is met.",
  },
  {
    index: "04",
    title: "Monitor",
    description: "Track every execution, inspect logs, and catch failures before they pile up.",
  },
];

export const shieldIcon = ShieldCheck;
