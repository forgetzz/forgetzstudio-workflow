"use client";

import {
  Cloud,
  Database,
  Folder,
  Plus,
} from "lucide-react";


import Instagram from "./ui/instagram";
import Threads from "./ui/threads";
import Tiktok from "./ui/tiktok";
import Facebook from "./ui/facebook";

export default function Tools() {



  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold ">
            Tool Registry
          </h1>

          <p className="mt-2 /60">
            Connect external services for your AI agents.
          </p>
        </div>

        <button
          className="
          neu-button
          active:neu-button-active
          active:bg-emerald-900
            flex
            items-center
            gap-2
            rounded-2xl
            bg-emerald-800
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-emerald-700
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

        {/* <CardSpotlightUi name="Telegram"
          description="Bot integration"
          icon={FaTelegram} /> */}

        {/* 
        <ToolCard
          name="Telegram"
          description="Bot integration"
          icon={FaTelegram}
        /> */}
        <div className="neu">
          <Instagram />
        </div>
        <div className="neu">
          <Tiktok />
        </div>
        <div className="neu">
          <Facebook />
        </div>

        <div className="neu">
          <Threads />
        </div>


        {/* <ToolCard
          name="Tiktok"
          description="Social media"
          icon={FaTiktok}
        />


        // <ToolCard
        //   name="WhatsApp"
        //   description="Bot WhatsApp"
        //   icon={FaWhatsapp}
        // /> */}

      </div>
    </div>
  );
}