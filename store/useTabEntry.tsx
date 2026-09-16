import { dataEntrys } from "@/utils/entryTab"
import { create } from "zustand"


interface EntryTab {
    activeTab: dataEntrys
    setActiveTab: (tab: dataEntrys) => void
}


export const useTabEntry = create<EntryTab>((set) => ({
  activeTab: "login",
  setActiveTab: (tab) => set({activeTab:tab}) 
}))