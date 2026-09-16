"use client";

import { useState } from "react";
import { GalleryHorizontal, Home, Menu, Settings, User, X } from "lucide-react";
import { InstagramStore } from "@/store/useTabstore";
import { InstagramKey } from "@/utils/useTab";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
   const router = useRouter()
  const { setActiveTab } = InstagramStore();

  const navbarMenu = [
    {
      label: "Home",
      value: "home",
      icon: Home,
    },
    {
      label: "Profile",
      value: "profile",
      icon: User,
    },
    {
      label: "Gallery",
      value: "gallery",
      icon: GalleryHorizontal,
    },
    {
      label: "Setting",
      value: "setting",
      icon: Settings,
    },

  ] as const;

  const handleTabClick = (value: InstagramKey) => {
    setActiveTab(value);
    setOpen(false);
  };


  const backToDashboard = () => {
    router.push('/')
  }

  return (
    <header className="neu relative mx-auto mb-5 flex max-w-6xl items-center justify-between rounded-2xl p-4">
      {/* Logo */}
      <button
        type="button"
        onClick={backToDashboard}
        className="text-xl font-bold tracking-tight"
      >
        Instagram
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 md:flex">
        {navbarMenu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => handleTabClick(item.value)}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all duration-200 hover:neu-inset"
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="neu flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
        aria-label="Toggle navigation"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Navigation */}
      {open && (
        <nav
          className="
            neu absolute left-0 right-0 top-full z-50 mt-3
            flex flex-col gap-2 rounded-2xl p-3
            bg-white dark:bg-slate-900
            md:hidden
          "
        >
          {navbarMenu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleTabClick(item.value)}
                className="
                  flex items-center gap-3
                  rounded-xl px-4 py-3 text-sm
                  transition-all duration-200
                  hover:neu-inset
                "
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}