"use client"

import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Activity } from "./activityTracker"

interface ActivityListProps {
  activities: Activity[]
  onSelectActivity: (activity: Activity) => void
  selectedActivityId?: string
}

export default function ActivityList({ activities, onSelectActivity, selectedActivityId }: ActivityListProps) {
  // Group activities by date
  const groupedActivities = activities.reduce(
    (groups, activity) => {
      const date = activity.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(activity)
      return groups
    },
    {} as Record<string, Activity[]>,
  )

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => {
    return parseISO(b).getTime() - parseISO(a).getTime()
  })

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            {format(parseISO(date), "EEEE, MMMM d")}
          </h3>
          <div className="space-y-2">
            {groupedActivities[date].map((activity) => (
              <div
                key={activity.id}
                className={cn(
                  "p-3 rounded-md cursor-pointer transition-colors",
                  activity.id === selectedActivityId
                    ? "bg-rose-100 dark:bg-rose-900"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
                onClick={() => onSelectActivity(activity)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium truncate">{activity.title}</h4>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
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
                  className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1"
                  dangerouslySetInnerHTML={{ __html: activity.content }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
