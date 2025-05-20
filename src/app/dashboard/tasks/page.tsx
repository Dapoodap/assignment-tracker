import { TaskList } from "@/components/dashboard/task-list"

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Tasks</h2>
        </div>
        <TaskList />
      </div>
    </div>
  )
}
