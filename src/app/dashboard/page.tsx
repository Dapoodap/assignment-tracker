
import { auth } from "@/auth"
import DashboardView from "@/components/dashboard/dashboard-view";
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }
  return (
    <DashboardView/>
  )
}
