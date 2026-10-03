import { cn } from "@/utils";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import {
  Bot,
  Database,
  FileText,

  LucideProps,
  MessageCircle,
  PlugZap,
  TrendingUp,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BiLogoMediumSquare } from "react-icons/bi";

interface Cards {
  title: string
  value: number | string
  icon: LucideIcon
}


const cards = [
  {
    title: "AI Agents",
    value: 1,
    icon: Bot,
  },
  {
    title: "Registered Tools",
    value: 2,
    icon: PlugZap,
  },
  {
    title: "Documents",
    value: 2,
    icon: FileText,
  },
  {
    title: "Vector Database",
    value: 23,
    icon: Database,
  },
];



export default function Dashboard() {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const { getToken } = useAuth()
  const [dataPlatform, setDataPltaform] = useState<string[]>([])

  const getPlatfrom = async () => {
    if (!url) return

    try {
      const token = await getToken()


      const response = await axios.get(`${url}/postmedia`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })



      const data: string[] = response.data
      setDataPltaform(data)
    } catch {

      console.log("error")
    }


  }
  useEffect(() => {
    getPlatfrom()
  }, [])





  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold ">
          Dashboard
        </h1>

        <p className="mt-2 /60">
          Welcome back. Manage your AI agents,
          documents and integrations.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">



        <div
          className={cn(
            "rounded-3xl backdrop-blur-xl p-6",
            "neu"
          )}
        >
          <div className="flex items-center justify-between">

            <h1>
              <MessageCircle size={30} />
            </h1>


            <span className="/40 text-sm">
              Live
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-bold ">
            {dataPlatform.length}
          </h2>

          <p className="mt-2 /60">
            Platform
          </p>
        </div>

        
        <div
          className={cn(
            "rounded-3xl backdrop-blur-xl p-6",
            "neu"
          )}
        >
          <div className="flex items-center justify-between">
            <h1>
              <Users size={30} />
            </h1>

            <span className="/40 text-sm">
              Live
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-bold ">
         Free
          </h2>

          <p className="mt-2 /60">
            Account Type
          </p>
        </div>
{/* 
        <div
          className={cn(
            "rounded-3xl backdrop-blur-xl p-6",
            "neu"
          )}
        >
          <div className="flex items-center justify-between">
            <h1>
              <Users size={30} />
            </h1>

            <span className="/40 text-sm">
              Live
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-bold ">
         Free
          </h2>

          <p className="mt-2 /60">
            Account Type
          </p>
        </div> */}

      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border bo/1/10 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-400" />

            <h2 className="text-xl font-semibold ">
              Activity
            </h2>
          </div>

          <div className="mt-6 space-y-4 /70">
            <p>• Agent Customer Support updated.</p>
            <p>• 2 new documents indexed.</p>
            <p>• Google Drive synced.</p>
            <p>• Slack Tool connected.</p>
          </div>
        </div>

        <div className="rounded-3xl border bo/1/10 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3">
            <Users className="text-purple-400" />

            <h2 className="text-xl font-semibold ">
              Workspace
            </h2>
          </div>

          <div className="mt-6 space-y-3 /70">
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