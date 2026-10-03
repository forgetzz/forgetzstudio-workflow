"use client";

import Home from "@/components/Instagram/home";
import Navbar from "@/components/Instagram/navbar";
import useTheme from "@/hooks/useTheme";
import { InstagramStore } from "@/store/useTabstore";
import { cn } from "@/utils";
import { Colors } from "@/utils/colors";
import { instagramStrategy } from "@/utils/useTab";


export default function InstagramPage() {
    const { activeTab, setActiveTab } = InstagramStore()
    const { isDark, ThemeToggle } = useTheme()
    const theme = isDark ? Colors.Primary : Colors.Secondry

    return (
        <main className={cn(
            "min-h-screen  md:p-10",

            // this theme global
            `${theme}`
        )}>

            <Navbar />
            <main className={cn(
                // flex display
                "flex-1 min-h-screen p-1 md:p-4 ",

                " pb-24 md:pb-8"

            )}>
                <div className={cn(
                    "rounded-[10px_28px_10px_28px] border border-white/5 ", 

                    "backdrop-blur-xl shadow-2xl min-h-[calc(100vh-2rem)] p-6 md:p-10 relative"
                )}>
                    <div className={cn(
                        "absolute top-0 right-10 w-16 h-1.5 rounded-b-full "
                    )} />
                    {instagramStrategy[activeTab]}
                </div>
            </main>
        </main>
    );
}