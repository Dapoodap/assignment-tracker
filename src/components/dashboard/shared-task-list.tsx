"use client"

import { useState } from "react"
import { CheckCircle, Circle, MessageCircle, MoreHorizontal, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTaskStore } from "@/store/use-task-store"
import { format, parseISO } from "date-fns"

export function SharedTaskList() {
  const { sharedTasks, toggleTaskCompletion } = useTaskStore()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTasks = sharedTasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.sharedBy?.name.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )
  })

  const pendingTasks = filteredTasks.filter((task) => !task.completed)
  const completedTasks = filteredTasks.filter((task) => task.completed)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shared tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          {pendingTasks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full p-0 text-muted-foreground"
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          <Circle className="h-5 w-5" />
                          <span className="sr-only">Toggle task completion</span>
                        </Button>
                        <CardTitle className="text-base">{task.title}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Accept</DropdownMenuItem>
                          <DropdownMenuItem>Decline</DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Message {task.sharedBy?.name}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="pt-2">
                      <div dangerouslySetInnerHTML={{ __html: task.content }} />
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <div className="flex items-center justify-between w-full text-xs">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.sharedBy?.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{task.sharedBy?.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">From {task.sharedBy?.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{format(parseISO(task.date), "MMM d, yyyy")}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full capitalize ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : task.priority === "medium"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No pending shared tasks found.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {completedTasks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedTasks.map((task) => (
                <Card key={task.id} className="opacity-70">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full p-0 text-muted-foreground"
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="sr-only">Toggle task completion</span>
                        </Button>
                        <CardTitle className="text-base line-through">{task.title}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Message {task.sharedBy?.name}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="pt-2 line-through">
                      <div dangerouslySetInnerHTML={{ __html: task.content }} />
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <div className="flex items-center justify-between w-full text-xs">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.sharedBy?.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{task.sharedBy?.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">From {task.sharedBy?.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{format(parseISO(task.date), "MMM d, yyyy")}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full capitalize ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : task.priority === "medium"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No completed shared tasks found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
