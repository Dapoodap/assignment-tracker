"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function AnimatedHeader({ children }: { children: ReactNode }) {
  return (
    <motion.header
      className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50 dark:bg-gray-950/80"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.header>
  )
}
