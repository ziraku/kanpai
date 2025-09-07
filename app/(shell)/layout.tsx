"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, History, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/", icon: Home, label: "ホーム" },
  { href: "/rooms", icon: Users, label: "ルーム" },
  { href: "/history", icon: History, label: "履歴" },
  { href: "/settings", icon: Settings, label: "設定" },
]

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-20">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname === tab.href || 
              (tab.href !== "/" && pathname.startsWith(tab.href))
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors",
                  isActive
                    ? "text-brand"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}