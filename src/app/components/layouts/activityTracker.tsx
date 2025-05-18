"use client"    

import { useState } from "react"
import { format, subDays } from "date-fns"
import { Calendar, ChevronLeft, ChevronRight, Menu, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import ActivityList from "./activityList"
import ActivityEditor from "./activityEditor"


export default function ActivityTracker() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activities, setActivities] = useState<Activity[]>([
 
  ])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handlePreviousDay = () => {
    setSelectedDate((prev) => subDays(prev, 1))
  }

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const nextDay = new Date(prev)
      nextDay.setDate(nextDay.getDate() + 1)
      return nextDay
    })
  }

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsCreating(false)
  }

  const handleCreateActivity = () => {
    setSelectedActivity(null)
    setIsCreating(true)
  }

  const handleSaveActivity = (activity: Activity) => {
    if (activity.id) {
      // Update existing activity
      setActivities((prev) => prev.map((a) => (a.id === activity.id ? activity : a)))
    } else {
      // Create new activity
      const newActivity = {
        ...activity,
        id: Date.now().toString(),
        date: format(selectedDate, "yyyy-MM-dd"),
      }
      setActivities((prev) => [...prev, newActivity])
    }
    setIsCreating(false)
    setSelectedActivity(null)
  }

  const filteredActivities = activities.filter((activity) => activity.date === format(selectedDate, "yyyy-MM-dd"))

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="h-full bg-white dark:bg-gray-950 p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Activities</h2>
                <Button variant="outline" size="sm" onClick={handleCreateActivity}>
                  <Plus className="h-4 w-4 mr-1" /> New
                </Button>
              </div>
              <ActivityList
                activities={activities}
                onSelectActivity={handleSelectActivity}
                selectedActivityId={selectedActivity?.id}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden md:block bg-white dark:bg-gray-950 h-full transition-all duration-300 ease-in-out border-r dark:border-gray-800",
          isSidebarOpen ? "w-[280px]" : "w-0",
        )}
      >
        {isSidebarOpen && (
          <div className="p-4 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Activities</h2>
              <Button variant="outline" size="sm" onClick={handleCreateActivity}>
                <Plus className="h-4 w-4 mr-1" /> New
              </Button>
            </div>
            <ActivityList
              activities={activities}
              onSelectActivity={handleSelectActivity}
              selectedActivityId={selectedActivity?.id}
            />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="hidden md:flex mr-2" onClick={toggleSidebar}>
              {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePreviousDay}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{format(selectedDate, "MMMM d, yyyy")}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleNextDay}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="outline" size="sm" onClick={handleCreateActivity}>
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-4">
          {isCreating ? (
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg border dark:border-gray-800 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                <h3 className="text-lg font-medium">New Activity</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsCreating(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ActivityEditor onSave={handleSaveActivity} />
            </div>
          ) : selectedActivity ? (
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg border dark:border-gray-800 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                <h3 className="text-lg font-medium">{selectedActivity.title}</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedActivity(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ActivityEditor activity={selectedActivity} onSave={handleSaveActivity} />
            </div>
          ) : filteredActivities.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white dark:bg-gray-950 rounded-lg shadow-lg border dark:border-gray-800 p-4 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => handleSelectActivity(activity)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium truncate">{activity.title}</h3>
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        activity.category === "bugfix"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : activity.category === "development"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                      )}
                    >
                      {activity.category}
                    </span>
                  </div>
                  <div
                    className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: activity.content }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg border dark:border-gray-800 p-8 max-w-md">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No activities for today</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start tracking your work by creating a new activity entry.
                </p>
                <Button onClick={handleCreateActivity}>
                  <Plus className="h-4 w-4 mr-1" /> Create Activity
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export interface Activity {
  id: string
  date: string
  title: string
  content: string
  category: "development" | "bugfix" | "review"
}
