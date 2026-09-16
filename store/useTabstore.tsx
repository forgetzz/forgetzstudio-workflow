import { InstagramKey, Tabkey } from "@/utils/useTab";
import { create } from "zustand";


interface Tabstore {
    activeTab: Tabkey
    setActiveTab: (tab:Tabkey) => void
    
}

interface InstagramStoreKey {
    activeTab: InstagramKey
    setActiveTab: (tab:InstagramKey) => void
    
}


export const useTabstore = create<Tabstore>((set) => ({
   activeTab: "Dashboard",
   setActiveTab: (tab) => set({activeTab: tab})
}))



export const InstagramStore = create<InstagramStoreKey>((set) =>({
   activeTab: "home",
   setActiveTab: (tab) => set({activeTab: tab})
}))

