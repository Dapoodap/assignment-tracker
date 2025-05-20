"use client"

import { useEffect, useState } from "react"

export function BackgroundGradient() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only update every few pixels moved to improve performance
      if (Math.abs(e.clientX - position.x) > 5 || Math.abs(e.clientY - position.y) > 5) {
        setPosition({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseEnter = () => setOpacity(1)
    const handleMouseLeave = () => setOpacity(0)

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [position])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-500"
      style={{
        opacity,
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--color-rose-500), 0.05), transparent 40%)`,
      }}
    />
  )
}
