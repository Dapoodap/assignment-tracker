"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  bgColor: string
  delay?: number
}

export function FeatureCard({ icon, title, description, bgColor, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "rgba(var(--color-rose-500), 0.5)",
      }}
    >
      <motion.div
        className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>

      {/* Decorative element */}
      <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-transparent to-gray-200 dark:to-gray-800 opacity-30"></div>
    </motion.div>
  )
}
