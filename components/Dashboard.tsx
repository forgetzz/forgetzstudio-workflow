import { useUser } from "@clerk/nextjs";
import {
  Bot,
  Database,
  FileText,
  PlugZap,
  TrendingUp,
  Users,
} from "lucide-react";

const cards = [
  {
    title: "AI Agents",
    value: "1",
    icon: Bot,
  },
  {
    title: "Registered Tools",
    value: "1",
    icon: PlugZap,
  },
  {
    title: "Documents",
    value: "2",
    icon: FileText,
  },
  {
    title: "Vector Database",
    value: "Qdrant",
    icon: Database,
  },
];

export default function Dashboard() {

  const {user} = useUser()

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-white/60">
          Welcome back. Manage your AI agents,
          documents and integrations.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6"
            >
              <div className="flex items-center justify-between">
                <Icon className="text-cyan-300" />

                <span className="text-white/40 text-sm">
                  Live
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-bold text-white">
                {card.value}
              </h2>

              <p className="mt-2 text-white/60">
                {card.title}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-400" />

            <h2 className="text-xl font-semibold text-white">
              Activity
            </h2>
          </div>

          <div className="mt-6 space-y-4 text-white/70">
            <p>• Agent Customer Support updated.</p>
            <p>• 2 new documents indexed.</p>
            <p>• Google Drive synced.</p>
            <p>• Slack Tool connected.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3">
            <Users className="text-purple-400" />

            <h2 className="text-xl font-semibold text-white">
              Workspace
            </h2>
          </div>

          <div className="mt-6 space-y-3 text-white/70">
            <p>Members : 6</p>
            <p>Storage : 2.4 GB</p>
            <p>Projects : 14</p>
            <p>API Requests : 18.4K</p>
          </div>
        </div>
      </section>
    </div>
  );
}