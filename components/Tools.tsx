"use client";

import {
  Cloud,
  Database,
  Folder,
  Plus,
} from "lucide-react";

import {
  FaDiscord,
  FaInstagram,
  FaSlack,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import ToolCard from "./ui/toolCard";
import GmailTool from "./ui/gmail";
import Github from "./ui/github";
import Instagram from "./ui/instagram";
import { CardSpotlightDemo } from "./ui/cardSpotlight";

export default function Tools() {




  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Tool Registry
          </h1>

          <p className="mt-2 text-white/60">
            Connect external services for your AI agents.
          </p>
        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-cyan-500
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-cyan-400
          "
        >
          <Plus size={18} />
          Register Tool
        </button>
      </div>

      {/* TOOLS */}
      <div className=" grid gap-5 md:grid-cols-2 xl:grid-cols-3">


        {/* <div className="neu">
          <GmailTool />

        </div>



        <div className="neu">
          <Github />

        </div> */}

        {/* <CardSpotlightDemo    name="Telegram"
          description="Bot integration"
          icon={FaTelegram} />


        <ToolCard
          name="Telegram"
          description="Bot integration"
          icon={FaTelegram}
        /> */}
        <Instagram />

        {/* <ToolCard
          name="Tiktok"
          description="Social media"
          icon={FaTiktok}
        />


        <ToolCard
          name="WhatsApp"
          description="Bot WhatsApp"
          icon={FaWhatsapp}
        /> */}

      </div>
    </div>
  );
}