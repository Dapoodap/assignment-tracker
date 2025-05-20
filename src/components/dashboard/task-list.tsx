/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { CheckCircle, Circle, MoreHorizontal, Plus, Search, Share2, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTaskStore, type Task } from "@/store/use-task-store"
import { format, parseISO } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TaskEditor } from "../ui/task-editor"

export function TaskList() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion, shareTask } = useTaskStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // New task state
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    content: "<p></p>",
    date: format(new Date(), "yyyy-MM-dd"),
    priority: "medium",
    category: "Work",
    completed: false,
  })

  // Edit task state
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Share task state
  const [sharingTask, setSharingTask] = useState<Task | null>(null)
  const [recipient, setRecipient] = useState("")

  // Delete task state
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)

  const handleAddTask = () => {
    if (newTask.title && newTask.content) {
      addTask(newTask as Omit<Task, "id">)
      setNewTask({
        title: "",
        content: "<p></p>",
        date: format(new Date(), "yyyy-MM-dd"),
        priority: "medium",
        category: "Work",
        completed: false,
      })
    }
  }

  const handleUpdateTask = () => {
    if (editingTask && editingTask.title && editingTask.content) {
      updateTask(editingTask.id, editingTask)
      setEditingTask(null)
    }
  }

  const handleShareTask = () => {
    if (sharingTask && recipient) {
      shareTask(sharingTask.id, recipient)
      setSharingTask(null)
      setRecipient("")
    }
  }

  const handleDeleteTask = () => {
    if (deletingTaskId) {
      deleteTask(deletingTaskId)
      setDeletingTaskId(null)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || task.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const completedTasks = filteredTasks.filter((task) => task.completed)
  const pendingTasks = filteredTasks.filter((task) => !task.completed)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to your list.</DialogDescription>
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
                  content={newTask.content || "<p></p>"}
                  onChange={(content) => setNewTask({ ...newTask, content })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Due Date</Label>
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
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                          <DropdownMenuItem onClick={() => setEditingTask(task)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSharingTask(task)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => setDeletingTaskId(task.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
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
                      <span className="text-muted-foreground">{format(parseISO(task.date), "MMM d, yyyy")}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{task.category}</span>
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
              <p className="text-muted-foreground">No pending tasks found.</p>
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
                          <DropdownMenuItem onClick={() => setDeletingTaskId(task.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
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
                      <span className="text-muted-foreground">{format(parseISO(task.date), "MMM d, yyyy")}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{task.category}</span>
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
              <p className="text-muted-foreground">No completed tasks found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Task Dialog */}
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Make changes to your task.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  placeholder="Task title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <TaskEditor
                  content={editingTask.content}
                  onChange={(content) => setEditingTask({ ...editingTask, content })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-date">Due Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingTask.date}
                    onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setEditingTask({ ...editingTask, priority: value })
                    }
                  >
                    <SelectTrigger id="edit-priority">
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
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingTask.category}
                  onValueChange={(value: "Work" | "Personal") => setEditingTask({ ...editingTask, category: value })}
                >
                  <SelectTrigger id="edit-category">
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
              <Button type="submit" onClick={handleUpdateTask}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Share Task Dialog */}
      {sharingTask && (
        <Dialog open={!!sharingTask} onOpenChange={(open) => !open && setSharingTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Task</DialogTitle>
              <DialogDescription>Share this task with a team member.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Task</Label>
                <div className="p-3 border rounded-md bg-muted/50">
                  <p className="font-medium">{sharingTask.title}</p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="recipient">Recipient Email</Label>
                <Input
                  id="recipient"
                  type="email"
                  placeholder="colleague@example.com"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Input id="message" placeholder="Add a message to your colleague" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleShareTask}>
                Share Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Task Dialog */}
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
