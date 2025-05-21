"use client"

import { Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, isAfter, parseISO } from "date-fns"
import { TaskResponseDto } from "@/constant/types/dto/task.dto"

export function UpcomingTasks({
  tasks
}:{
  tasks : TaskResponseDto[]
}
) {
  // const { tasks } = useTaskStore()

  // Get upcoming tasks (not completed and due in the future)
  const today = new Date()
  const upcomingTasks = tasks && tasks
    .filter((task) => !task.completed && isAfter(parseISO(task.date), today))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-4">
      {upcomingTasks.map((task) => (
        <div key={task.id} className="flex items-start space-x-3">
          <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0 text-muted-foreground">
            <Circle className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Toggle task completion</span>
          </Button>
          <div>
            <p className="font-medium">{task.title}</p>
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
      ))}
      {upcomingTasks.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p>No upcoming tasks.</p>
        </div>
      )}
    </div>
  )
}
