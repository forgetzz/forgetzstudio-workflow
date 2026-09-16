import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { ThemeContextProvider } from "@/context/themeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



const poppins = Poppins({
  subsets: ["devanagari"],
  weight: "100",
  variable: "--font-poppins",
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "AI Workspace for managing documents, embeddings, and AI agents.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider>
        <ThemeContextProvider>


          <html
            lang="en"
            className={`${geistSans.variable} ${poppins.variable} h-full antialiased`}
          >
            <head>
              <link
                href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
              />
            </head>
            <body className="min-h-full flex flex-col">{children}</body>
          </html>
        </ThemeContextProvider>
      </ClerkProvider>
    </>
  );
}
