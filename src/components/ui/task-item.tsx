"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface TaskItemProps {
  title: string
  description: string
  completed: boolean
  delay?: number
}

export function TaskItem({ title, description, completed, delay = 0 }: TaskItemProps) {
  return (
    <motion.div
      className="flex items-start"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 5 }}
    >
      <motion.div className="flex-shrink-0 mt-1" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
        <CheckCircle className={`h-5 w-5 ${completed ? "text-green-500" : "text-gray-300 dark:text-gray-600"}`} />
      </motion.div>
      <div className="ml-3">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </motion.div>
  )
}
