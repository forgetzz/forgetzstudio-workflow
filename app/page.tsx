// "use client"
// import CTA from "@/components/home/CTA";
// import DeveloperSection from "@/components/home/DeveloperSection";
// import ExecutionMonitor from "@/components/home/ExecutionMonitor";
// import Features from "@/components/home/Features";
// import Footer from "@/components/home/Footer";
// import GitHubWorkflow from "@/components/home/GitHubWorkflow";
// import GmailWorkflow from "@/components/home/GmailWorkflow";
// import Hero from "@/components/home/Hero";
// import HowItWorks from "@/components/home/HowItWorks";
// import Integrations from "@/components/home/Integrations";
// import MCPSection from "@/components/home/MCPSection";
// import Navbar from "@/components/home/Navbar";
// import SocialAutomation from "@/components/home/SocialAutomation";
// import WhatsAppWorkflow from "@/components/home/WhatsAppWorkflow";
// import WorkflowBuilder from "@/components/home/WorkflowBuilder";
// import WorkflowPreview from "@/components/home/WorkflowPreview";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";


// export default function Home() {
//   const user = useUser()
//   const router = useRouter()
//   useEffect(() => {
//     const goToHomePage = () => {
//       if (user.user?.emailAddresses) {
//         router.replace("/home")
//       }
//     }

//     goToHomePage()
//   }, [user])




//   return (
//     <main className="relative min-h-[100dvh] w-full">
//       <Navbar />
//       <Hero />
//       <WorkflowPreview />
//       <SocialAutomation />
//       <MCPSection />
//       <GmailWorkflow />
//       <GitHubWorkflow />
//       <WhatsAppWorkflow />
//       <WorkflowBuilder />
//       <Integrations />
//       <DeveloperSection />
//       <ExecutionMonitor />
//       <Features />
//       <HowItWorks />
//       <CTA />
//       <Footer />
//     </main>
//   );
// }


// function TypeScriptPage() {



//   return (
//     <div>
//       <h1>TypeScript Playground</h1>

//       <p>Open file ini dan arahkan mouse ke setiap type.</p>
//     </div>
//   );
// }

"use client";

import { LayoutDashboard, LogOutIcon, MessageCircle, PictureInPicture2, Settings, Wrench } from "lucide-react";
import { useTabstore } from "@/store/useTabstore";
import { dataStategy } from "@/utils/useTab";

import { useAuth, useUser } from "@clerk/nextjs";

import { cn } from "@/utils/clsx";
import useTheme from "@/hooks/useTheme";


const menus = [
  {
    label: "Dashboard",
    value: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tools",
    value: "Tools",
    icon: Wrench,
  },
  {
    label: "Upload",
    value: "Upload",
    icon: PictureInPicture2,
  },
  {
    label: "Chat",
    value: "Chat",
    icon: MessageCircle,
  },
  {
    label: "Setting",
    value: "Setting",
    icon: Settings,
  },
  {
    label: "Logout",
    value: "Logout",
    icon: LogOutIcon,
  },

] as const;

export default function Home() {
  const { activeTab, setActiveTab } = useTabstore();
  const { user, isLoaded } = useUser()
  const { isDark, ThemeToggle } = useTheme()

  const theme = isDark ? "bg-black text-white" : "bg-white text-black"




  return (

    <div
      className={`min-h-screen relative overflow-hidden  ${theme}`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse 900px 500px at 20% -10%, rgba(227,163,77,0.16), transparent 60%), radial-gradient(circle at 90% 10%, rgba(124,154,130,0.10), transparent 50%)",
      }}
    >

    
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="flex relative ">
        {/* Sidebar Desktop */}
        <aside className="neu  hidden md:flex flex-col w-72 h-screen sticky top-0 p-6">
          <div className="">
            {/* Spine seperti buku catatan */}
            <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-gradient-to-b from-[#fffcf8]/60 via-[#ffffcf8]/20 to-transparent" />

            <div className="p-8 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="rotate-[-3deg] w-9 h-9 rounded-md flex items-center justify-center shadow-lg shadow-[#fffcf9]/20">
                  <span className="font-mono text-[13px] font-bold ">AI</span>
                </div>
                <h1 className="text-[22px] font-semibold tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                  Agent Workspace
                </h1>
              </div>
              <p className="text-[13px] mt-2 font-mono tracking-wide">
                {user?.fullName}
              </p>


            </div>

            <nav className={cn(
              // ini tinggi components
              "min-h-screen"
            )}>
              {menus.map((menu, i) => {
                const Icon = menu.icon;
                const active = activeTab === menu.value;
                const tilt = i % 2 === 0 ? "-rotate-[0.4deg]" : "rotate-[0.4deg]";

                return (
                  <button
                    key={menu.value}
                    onClick={() => setActiveTab(menu.value)}
                    className={`group relative w-full flex items-center gap-4 rounded-xl px-5 py-3.5 transition-all duration-300 ${tilt}
                ${active
                        ? "neu-button-active"
                        : "  hover:translate-x-0.5"
                      }`}
                  >

                    <Icon size={20} className="relative z-10 shrink-0" />

                    {menu.label}

                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-h-screen p-2 md:p-8 pb-24 md:pb-8 ">
          <div className="rounded-[10px_28px_10px_28px] border border-white/5 backdrop-blur-xl shadow-2xl min-h-[calc(100vh-2rem)] p-6 md:p-10 relative">
            <div className="absolute top-0 right-10 w-16 h-1.5 rounded-b-full " />
            {dataStategy[activeTab]}
          </div>
        </main>
      </div>

      {/* Bottom Navigation Mobile */}
      <nav
        className="
    fixed inset-x-3 bottom-4 z-50
    rounded-2xl
    border border-black/5
    bg-white/80
    p-2
    shadow-2xl
    backdrop-blur-xl
    dark:border-white/10
    dark:bg-slate-900/80
    md:hidden
  "
      >
        <div className="grid w-full grid-flow-col auto-cols-fr">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = activeTab === menu.value;

            return (
              <button
                key={menu.value}
                type="button"
                onClick={() => setActiveTab(menu.value)}
                className={`
            group flex w-full flex-col items-center justify-center
            gap-1 rounded-xl py-2
            transition-all duration-200
            active:scale-95
            ${active
                    ? "-translate-y-0.5 text-[#E3A34D]"
                    : "text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white/70"
                  }
          `}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 2}
                  className="transition-transform duration-200"
                />

                <span
                  className={`
              text-[10px] font-medium
              leading-none
              ${active ? "opacity-100" : "opacity-80"}
            `}
                >
                  {menu.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}