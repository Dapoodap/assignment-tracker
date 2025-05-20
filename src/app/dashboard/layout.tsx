import type { ReactNode } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-100  dark:bg-gray-950">
        <DashboardSidebar />
        <div className="w-full h-full overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  )
}
