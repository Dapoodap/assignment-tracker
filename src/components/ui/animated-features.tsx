"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { FeatureCard } from "./feature-card"

interface Feature {
  icon: ReactNode
  title: string
  description: string
  bgColor: string
}

export function AnimatedFeatures({ features }: { features: Feature[] }) {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to stay organized and collaborate effectively with your team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bgColor={feature.bgColor}
              delay={0.1 + index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
