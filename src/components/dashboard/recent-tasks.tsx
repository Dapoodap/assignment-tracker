 
"use client"

import { CheckCircle, Circle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTaskStore } from "@/store/use-task-store"
import { format, parseISO } from "date-fns"
import { TaskResponseDto } from "@/constant/types/dto/task.dto"

export function RecentTasks(
  {
    data
  }:{
    data : TaskResponseDto[]
  }
) {
  const { toggleTaskCompletion } = useTaskStore()
  

  // Get the 5 most recent tasks
  const recentTasks = data && data.sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()).slice(0, 5)

  return (
    <div className="space-y-4">
      {recentTasks.map((task) => (
        <div key={task.id} className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full p-0 text-muted-foreground"
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="sr-only">Toggle task completion</span>
            </Button>
            <div>
              <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{format(parseISO(task.date), "MMM d, yyyy")}</span>
                <span>•</span>
                <span
                  className={`capitalize ${
                    task.priority === "high"
                      ? "text-red-500"
                      : task.priority === "medium"
                        ? "text-amber-500"
                        : "text-blue-500"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      {recentTasks.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p>No tasks found.</p>
        </div>
      )}
    </div>
  )
}
