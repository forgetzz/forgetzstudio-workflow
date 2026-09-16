"use client"
import { createContext, ReactNode, useState } from "react";

interface ThemeProvider {
    children: ReactNode
}

interface themeContextType {
    isDark : boolean
    ThemeToggle: () => void
}


export const ThemeContext = createContext<themeContextType | undefined>(undefined)

export function ThemeContextProvider({ children }: ThemeProvider) {
    const [isDark, setIsDark] = useState(true)
    const ThemeToggle = () => setIsDark(prev => !prev)
    return (
        <ThemeContext.Provider value={{
            isDark,
            ThemeToggle
        }}>
            {children}
        </ThemeContext.Provider>
    )
}