"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { type ReactNode, useRef } from "react"
import { TaskCard } from "./task-card"

export function AnimatedHero({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-rose-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20 overflow-hidden"
    >
      {/* <FloatingShapes /> */}

      <motion.div className="container mx-auto md:px-32 px-4 relative z-10" style={{ opacity, scale }}>
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {children}
          </motion.div>
          <motion.div
            className="md:w-1/2 w-full md:pl-10 z-10"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <TaskCard />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
