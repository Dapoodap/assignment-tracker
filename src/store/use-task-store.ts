import { create } from "zustand"
import { persist } from "zustand/middleware"
import { format } from "date-fns"

export interface Task {
  id: string
  title: string
  content: string
  completed: boolean
  date: string
  priority: "low" | "medium" | "high"
  category: "Work" | "Personal"
  sharedBy?: {
    name: string
    avatar: string
    initials: string
  }
  isShared?: boolean
}

interface TaskState {
  tasks: Task[]
  sharedTasks: Task[]
  addTask: (task: Omit<Task, "id">) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskCompletion: (id: string) => void
  shareTask: (id: string, recipient: string) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "1",
          title: "Complete project proposal",
          content: "<p>Finish the proposal document for the new client project.</p>",
          completed: false,
          date: format(new Date(), "yyyy-MM-dd"),
          priority: "high",
          category: "Work",
        },
        {
          id: "2",
          title: "Review code changes",
          content: "<p>Review the pull request for the authentication feature.</p>",
          completed: false,
          date: format(new Date(), "yyyy-MM-dd"),
          priority: "medium",
          category: "Work",
        },
        {
          id: "3",
          title: "Prepare for client meeting",
          content: "<p>Create slides and gather data for tomorrow's client presentation.</p>",
          completed: false,
          date: format(new Date(Date.now() + 86400000), "yyyy-MM-dd"),
          priority: "high",
          category: "Work",
        },
      ],
      sharedTasks: [
        {
          id: "shared-1",
          title: "Review marketing materials",
          content: "<p>Please review the new marketing materials for the product launch.</p>",
          completed: false,
          date: format(new Date(), "yyyy-MM-dd"),
          priority: "high",
          category: "Work",
          sharedBy: {
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "AJ",
          },
          isShared: true,
        },
        {
          id: "shared-2",
          title: "Provide feedback on design",
          content: "<p>Check the new UI design for the dashboard and provide feedback.</p>",
          completed: false,
          date: format(new Date(Date.now() + 86400000), "yyyy-MM-dd"),
          priority: "medium",
          category: "Work",
          sharedBy: {
            name: "Sarah Miller",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "SM",
          },
          isShared: true,
        },
      ],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }],
        })),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTaskCompletion: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
          sharedTasks: state.sharedTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      shareTask: (id, recipient) =>
        set((state) => {
          const taskToShare = state.tasks.find((task) => task.id === id)
          if (!taskToShare) return state

          // In a real app, this would send the task to the recipient
          console.log(`Sharing task ${id} with ${recipient}`)

          return state
        }),
    }),
    {
      name: "task-storage",
    },
  ),
)
