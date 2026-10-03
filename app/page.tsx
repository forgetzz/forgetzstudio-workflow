"use client"
import CTA from "@/components/home/CTA";
import DeveloperSection from "@/components/home/DeveloperSection";
import ExecutionMonitor from "@/components/home/ExecutionMonitor";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import GitHubWorkflow from "@/components/home/GitHubWorkflow";
import GmailWorkflow from "@/components/home/GmailWorkflow";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Integrations from "@/components/home/Integrations";
import MCPSection from "@/components/home/MCPSection";
import Navbar from "@/components/home/Navbar";
import SocialAutomation from "@/components/home/SocialAutomation";
import WhatsAppWorkflow from "@/components/home/WhatsAppWorkflow";
import WorkflowBuilder from "@/components/home/WorkflowBuilder";
import WorkflowPreview from "@/components/home/WorkflowPreview";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const user = useUser()
  const router = useRouter()
  
  useEffect(() => {
    const goToHomePage = () => {
      if (user.user?.emailAddresses) {
        router.replace("/home")
      }
    }

    goToHomePage()
  }, [user])




  return (
    <main className="relative min-h-[100dvh] w-full">
      <Navbar />
      <Hero />
      <WorkflowPreview />
      <SocialAutomation />
      <MCPSection />
      <GmailWorkflow />
      <GitHubWorkflow />
      <WhatsAppWorkflow />
      <WorkflowBuilder />
      <Integrations />
      <DeveloperSection />
      <ExecutionMonitor />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />

      
    </main>
  );
}


function TypeScriptPage() {



  return (
    <div>
      <h1>TypeScript Playground</h1>

      <p>Open file ini dan arahkan mouse ke setiap type.</p>
    </div>
  );
}

