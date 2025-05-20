"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function AnimatedFooter({ children }: { children: ReactNode }) {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </footer>
  )
}
