"use client"

import { motion } from "framer-motion"
import { TaskItem } from "./task-item"

export function TaskCard() {
  return (
    <div className="relative">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        whileHover={{
          y: -5,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500 mr-2"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500"></motion.div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Today&apos;s Tasks</h3>
            <span className="text-sm text-gray-500">May 20, 2025</span>
          </div>
          <div className="space-y-4">
            <TaskItem
              title="Complete project proposal"
              description="Due today at 5:00 PM"
              completed={true}
              delay={0.1}
            />
            <TaskItem title="Review code changes" description="Shared by Alex" completed={false} delay={0.2} />
            <TaskItem
              title="Prepare for client meeting"
              description="Tomorrow at 10:00 AM"
              completed={false}
              delay={0.3}
            />
          </div>
        </div>
      </motion.div>
      <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-rose-200 dark:bg-rose-900 rounded-full opacity-50 blur-2xl -z-10 animate-pulse"></div>
      <div
        className="absolute -top-6 -left-6 w-40 h-40 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-50 blur-2xl -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  )
}
