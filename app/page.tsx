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

;

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full">
      <Navbar />
      <Hero/>
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
