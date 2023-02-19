import { Inter as FontSans } from "@next/font/google"

import "@/styles/globals.css"
import Head from "next/head"
import { Toaster } from "@/ui/toaster"

import { cn } from "@/lib/utils"
import { SiteHeader } from "../components/site-header"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html
        lang="en"
        className={cn(
          "dark bg-white font-sans text-slate-900 antialiased",
          fontSans.variable
        )}
      >
        <Head>
          <title>Image alt tag generator</title>
        </Head>
        <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
          <Toaster />
          <SiteHeader />

          <main>{children}</main>
        </body>
      </html>
    </>
  )
}
