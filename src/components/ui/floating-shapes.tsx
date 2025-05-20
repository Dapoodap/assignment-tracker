"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface ShapeProps {
  x: number
  y: number
  size: number
  rotation: number
  color: string
  delay: number
  duration: number
}

function Shape({ x, y, size, rotation, color, delay, duration }: ShapeProps) {
  const variants = {
    initial: { x, y, rotate: rotation, opacity: 0 },
    animate: {
      opacity: [0, 0.5, 0.2],
      y: y + 50,
      transition: {
        delay,
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  return (
    <motion.div
      className={`absolute ${color} rounded-md blur-sm`}
      style={{ width: size, height: size }}
      variants={variants}
      initial="initial"
      animate="animate"
    />
  )
}

export function FloatingShapes({ count = 10 }: { count?: number }) {
  const shapes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 60 + 20
      const colors = [
        "bg-rose-200/30 dark:bg-rose-900/20",
        "bg-indigo-200/30 dark:bg-indigo-900/20",
        "bg-blue-200/30 dark:bg-blue-900/20",
        "bg-purple-200/30 dark:bg-purple-900/20",
      ]

      return {
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        size,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        duration: Math.random() * 10 + 10,
      }
    })
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <Shape key={shape.id} {...shape} />
      ))}
    </div>
  )
}
