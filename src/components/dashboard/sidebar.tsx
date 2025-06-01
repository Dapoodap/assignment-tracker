"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, CheckSquare, Home, LogOut, Settings, Share2, Sparkles, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { signOut, useSession } from "next-auth/react"

export function DashboardSidebar() {
  const { data: session, status } = useSession();

 
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }
  const handleSignOut = async () => {
    // Method 1: Using callbackUrl
    await signOut({ callbackUrl: '/login' });
    
    // Method 2: If the above doesn't work, try this:
    // await signOut();
    // router.push('/login');
  }

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 border-b dark:border-gray-800 z-30 flex items-center px-4">
        <SidebarTrigger />
        <div className="flex items-center ml-3">
          <Sparkles className="h-5 w-5 text-rose-500 mr-2" />
          <span className="font-bold">TaskShare</span>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar className="pt-16 md:pt-0">
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">TaskShare</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4 space-y-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                <Link href="/dashboard">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/tasks")}>
                <Link href="/dashboard/tasks">
                  <CheckSquare className="h-5 w-5" />
                  <span>My Tasks</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton disabled asChild isActive={isActive("/dashboard/shared")}>
                <Link  href="/dashboard/shared">
                  <Share2 className="h-5 w-5" />
                  <span>Shared With Me</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/calendar")}>
                <Link href="/dashboard/calendar">
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>{status === 'authenticated' ? (session?.user?.email)?.[0].toUpperCase() : ''}</AvatarFallback>
                </Avatar>
                <span>{status === 'authenticated' ? session?.user?.email : ''}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span 
>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
