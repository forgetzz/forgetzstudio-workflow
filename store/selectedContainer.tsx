import { create } from "zustand"


interface ContainerInstagram {
    activeContainer: string
    setActiveContainer: (tab: string) => void

}



export const useContainerInstagram = create<ContainerInstagram>((set) => ({
    activeContainer: "",
    setActiveContainer: (tab) => set({ activeContainer: tab })
}))