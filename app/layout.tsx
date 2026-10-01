import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { ThemeContextProvider } from "@/context/themeContext";
import { Space_Grotesk } from "next/font/google";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});
export const metadata: Metadata = {
  title: {
    default: "AI Workspace | Forgetz Studio",
    template: "%s | AI Workspace",
  },

  description:
    "AI Workspace for managing documents, knowledge bases, embeddings, and AI agents.",

  applicationName: "AI Workspace",

  authors: [
    {
      name: "Forgetz Studio",
      url: "https://forgetzstudio.com",
    },
  ],

  creator: "Forgetz Studio",
  publisher: "Forgetz Studio",

  openGraph: {
    title: "AI Workspace | Forgetz Studio",
    description:
      "Manage documents, knowledge bases, embeddings, and AI agents in one workspace.",
    siteName: "AI Workspace",
    type: "website",
    images: [
      {
        url: "/logo.png",
        alt: "AI Workspace | Forgetz Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Workspace | Forgetz Studio",
    description:
      "Manage documents, knowledge bases, embeddings, and AI agents in one workspace.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
         className={`
          ${geist.variable}
          ${inter.variable}
          ${jetbrains.variable}
        `}
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
