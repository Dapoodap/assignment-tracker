/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client"

import { CheckCircle, Circle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTaskStore } from "@/store/use-task-store"
import { format, parseISO } from "date-fns"
import { TaskResponseDto } from "@/constant/types/dto/task.dto"
import { useDeleteTask } from "@/hooks/useTasks"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { useRouter } from "next/navigation"

export function RecentTasks(
  {
    data
  }:{
    data : TaskResponseDto[]
  }
) {
  const { toggleTaskCompletion } = useTaskStore()
    const {mutate:deleteMutate } = useDeleteTask()
    const router = useRouter()
      const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)
    
   const handleDeleteTask = () => {
      if (deletingTaskId) {
        deleteMutate(deletingTaskId)
        setDeletingTaskId(null)
      }
    }

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
              {
                !task.completed  && (
                  <>
                  <DropdownMenuItem onClick={()=>{
                    router.push("/dashboard/tasks")
                  }}>Edit</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
                  </>
                )
              }
              
              <DropdownMenuItem onClick={() => setDeletingTaskId(task.id)} className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      {recentTasks.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p>No tasks found.</p>
        </div>
      )}
            <AlertDialog open={!!deletingTaskId} onOpenChange={(open: any) => !open && setDeletingTaskId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
