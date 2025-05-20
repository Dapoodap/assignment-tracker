"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function AnimatedCTA({ children }: { children: ReactNode }) {
  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* <FloatingShapes count={5} /> */}

      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.div>
    </section>
  )
}
