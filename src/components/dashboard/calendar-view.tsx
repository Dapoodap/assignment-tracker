"use client"

import { useState } from "react"
import { addMonths, format, getDay, getDaysInMonth, isSameDay, subMonths } from "date-fns"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Task, useTaskStore } from "@/store/use-task-store"
import { TaskEditor } from "../ui/task-editor"
import { Card, CardContent } from "../ui/card"
  interface NewTask {
  title: string;
  content: string;
  date: string;
  priority: "high" | "low" | "medium";
  category: string;
  completed: boolean;
}
export function CalendarView() {
  const { tasks, sharedTasks, addTask } = useTaskStore()
  const allTasks = [...tasks, ...sharedTasks]

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // New task state


const [newTask, setNewTask] = useState<NewTask>({
  title: "",
  content: "<p></p>",
  date: format(new Date(), "yyyy-MM-dd"),
  priority: "medium",
  category: "Work",
  completed: false,
})
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setNewTask({
      ...newTask,
      date: format(date, "yyyy-MM-dd"),
    })
  }

  const handleAddTask = () => {
    if (newTask.title && newTask.content) {
    addTask(newTask as Omit<Task, "id">);      setNewTask({
        title: "",
        content: "<p></p>",
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        priority: "medium",
        category: "Work",
        completed: false,
      })
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getDay(new Date(year, month, 1))

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    if (!date) return []
    const dateString = format(date, "yyyy-MM-dd")
    return allTasks.filter((task) => task.date === dateString)
  }

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</h3>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new task in your calendar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <TaskEditor content={newTask.content} onChange={(content) => setNewTask({ ...newTask, content })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: "low" | "medium" | "high") => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value: "Work" | "Personal") => setNewTask({ ...newTask, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddTask}>
                Save Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-32 rounded-lg border border-dashed"></div>
          }

          const dayTasks = getTasksForDate(day)
          const isToday = isSameDay(day, new Date())
          const isSelected = selectedDate && isSameDay(day, selectedDate)

          return (
            <Card
              key={index}
              className={`h-32 overflow-hidden cursor-pointer transition-colors ${
                isSelected ? "ring-2 ring-primary" : ""
              } ${isToday ? "bg-primary/5" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              <CardContent className="p-2">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{format(day, "d")}</span>
                  {dayTasks.length > 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                      {dayTasks.length}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs truncate rounded px-1.5 py-0.5 ${
                        task.isShared
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : task.priority === "high"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : task.priority === "medium"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-muted-foreground">+{dayTasks.length - 3} more</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedDate && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-3 w-3" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>Create a new task for {format(selectedDate, "MMMM d, yyyy")}.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Task title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <TaskEditor
                        content={newTask.content}
                        onChange={(content) => setNewTask({ ...newTask, content })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value: "low" | "medium" | "high") =>
                          setNewTask({ ...newTask, priority: value })
                        }
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newTask.category}
                        onValueChange={(value: "Work" | "Personal") => setNewTask({ ...newTask, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Work">Work</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddTask}>
                      Save Task
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {selectedDateTasks.length > 0 ? (
              <div className="space-y-3">
                {selectedDateTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors ${
                      task.completed ? "opacity-60" : ""
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        task.isShared
                          ? "bg-blue-500"
                          : task.priority === "high"
                            ? "bg-red-500"
                            : task.priority === "medium"
                              ? "bg-amber-500"
                              : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${task.completed ? "line-through" : ""}`}>{task.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="capitalize">{task.priority} Priority</span>
                        {task.isShared && (
                          <>
                            <span className="mx-1">•</span>
                            <span>Shared by {task.sharedBy?.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{task.category}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tasks scheduled for this day.</p>
                <p className="text-sm">Click the Add Task button to create a new task.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
