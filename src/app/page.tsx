import Link from "next/link"
import { Metadata } from "next"
import { ArrowRight, Calendar, CheckCircle, Share2, Sparkles } from 'lucide-react'

import { Button } from "@/components/ui/button"
// import { AnimatedCTA, AnimatedFeatures, AnimatedFooter, AnimatedHeader, AnimatedHero } from "@/components/ui/animated-components"
import { AnimatedHeader } from "@/components/ui/animated-header"
import { AnimatedHero } from "@/components/ui/animated-hero"
import { AnimatedFeatures } from "@/components/ui/animated-features"
import { AnimatedCTA } from "@/components/ui/animated-cta"
import { AnimatedFooter } from "@/components/ui/animated-footer"

export const metadata: Metadata = {
  title: "TaskShare - Track, Share, and Collaborate on Tasks Effortlessly",
  description: "A beautiful platform to manage your activities, share todos with your team, and stay organized with an intuitive calendar view.",
  openGraph: {
    title: "TaskShare - Task Management Made Beautiful",
    description: "Manage tasks, collaborate with your team, and stay organized with TaskShare's intuitive interface.",
    images: [{ url: "/og-image.png" }],
  },
}

export default function LandingPage() {
  return (
    <div className="flex relative flex-col min-h-screen overflow-hidden">
      {/* Navigation - Server rendered for SEO */}
      <AnimatedHeader>
        <div className="container mx-auto px-4 md:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">TaskShare</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium hover:underline relative group">
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/login">
              <Button className="relative overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedHeader>

      {/* Hero Section - Content is server rendered, animations are client-side */}
      <AnimatedHero>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Track, Share, and Collaborate on Tasks Effortlessly
        </h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          A beautiful platform to manage your activities, share todos with your team, and stay organized with an
          intuitive calendar view.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                Get Started{" "}
                <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="w-full sm:w-auto group relative overflow-hidden">
              <span className="relative z-10">Learn More</span>
              <span className="absolute inset-0 bg-gray-100 dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </Button>
          </Link>
        </div>
      </AnimatedHero>

      {/* Features Section - Server rendered with client animations */}
      <AnimatedFeatures
        features={[
          {
            icon: <CheckCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
            title: "Task Management",
            description:
              "Create, organize, and track your tasks with a beautiful and intuitive interface. Add rich text notes, deadlines, and priorities.",
            bgColor: "bg-rose-100 dark:bg-rose-900/30",
          },
          {
            icon: <Share2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
            title: "Task Sharing",
            description:
              "Easily share tasks with team members, friends, or family. Collaborate on projects and stay in sync with everyone's progress.",
            bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
          },
          {
            icon: <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
            title: "Calendar View",
            description:
              "Visualize your tasks and deadlines in a beautiful calendar interface. Get a clear overview of your schedule and never miss a deadline.",
            bgColor: "bg-blue-100 dark:bg-blue-900/30",
          },
        ]}
      />

      {/* CTA Section - Server rendered with client animations */}
      <AnimatedCTA>
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already using TaskShare to stay organized and collaborate effectively.
        </p>
        <Link href="/login">
          <Button size="lg" className="group relative overflow-hidden">
            <span className="relative z-10 group-hover:translate-x-1 transition-transform">
              Get Started <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
          </Button>
        </Link>
      </AnimatedCTA>

      {/* Footer - Server rendered */}
      <AnimatedFooter>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold">TaskShare</span>
            </div>
            <div className="flex space-x-6">
              <FooterLink href="#">Terms</FooterLink>
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">Help</FooterLink>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TaskShare. All rights reserved.
          </div>
        </div>
      </AnimatedFooter>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
    </a>
  )
}
