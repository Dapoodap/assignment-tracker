"use client"
import React from 'react'
import { CalendarDays, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentTasks } from "@/components/dashboard/recent-tasks"
import { SharedWithMe } from "@/components/dashboard/shared-with-me"
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks"
import { useGetMyTasks } from '@/hooks/useTasks'
import { TaskResponseDto } from '@/constant/types/dto/task.dto'
import { getDaysInMonth, isSameDay, parseISO } from 'date-fns'
const DashboardView = () => {
    const { data, isLoading } = useGetMyTasks()
  const completedTasks = !isLoading && data.filter((task:TaskResponseDto) => task.completed)
  const pendingTasks = !isLoading && data.filter((task:TaskResponseDto) => !task.completed)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {/* <Button>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              New Task
            </Button> */}
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
          {
            !isLoading && data && (
              
             <div className='flex flex-col gap-2'>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.length}</div>
                  {/* <p className="text-xs text-muted-foreground">+2 from yesterday</p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedTasks.length}</div>
                  {/* <p className="text-xs text-muted-foreground">+5 from yesterday</p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingTasks.length}</div>
                  {/* <p className="text-xs text-muted-foreground">-3 from yesterday</p> */}
                </CardContent>
              </Card>
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Shared</CardTitle>
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card> */}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="md:col-span-4 col-span-1">
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentTasks data={data}/>
                </CardContent>
              </Card>
              <Card className="md:col-span-3 col-span-1">
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>Tasks due in the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingTasks tasks={data}/>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Shared With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <SharedWithMe />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                  <CardDescription>May 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                      <div key={i} className="font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: getDaysInMonth(new Date()) }, (_, i) => {
                      const day = i + 1;
                      const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
                      const isToday = isSameDay(date, new Date());

                      const hasTaskPending = data.some((task :TaskResponseDto) => {
                        const taskDate = parseISO(task.date);
                        return isSameDay(taskDate, date) && !task.completed;
                      });
                      const hasTaskCompleted = data.some((task :TaskResponseDto) => {
                        const taskDate = parseISO(task.date);
                        return isSameDay(taskDate, date) && task.completed;
                      });
                      return (
                        <div
                          key={day}
                          className={`aspect-square flex items-center justify-center rounded-full ${
                            isToday ? "bg-primary text-primary-foreground" : hasTaskCompleted ? "bg-primary/10 text-primary" : hasTaskPending ? "bg-yellow-500 text-primary" : ""
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <Button variant="outline" size="sm">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      View Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
           </div>
            )
          }
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Analytics</CardTitle>
                <CardDescription>Your task completion rate over time</CardDescription>
              </CardHeader>
              {/* <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Analytics charts will appear here</p>
              </CardContent> */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DashboardView