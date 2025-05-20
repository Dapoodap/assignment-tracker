import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, Share2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">TaskShare</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Track, Share, and Collaborate on Tasks Effortlessly
              </h1>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                A beautiful platform to manage your activities, share todos with your team, and stay organized with an
                intuitive calendar view.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Today's Tasks</h3>
                      <span className="text-sm text-gray-500">May 20, 2025</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Complete project proposal</p>
                          <p className="text-sm text-gray-500">Due today at 5:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Review code changes</p>
                          <p className="text-sm text-gray-500">Shared by Alex</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Prepare for client meeting</p>
                          <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-rose-200 dark:bg-rose-900 rounded-full opacity-50 blur-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-50 blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to stay organized and collaborate effectively with your team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="bg-rose-100 dark:bg-rose-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Task Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create, organize, and track your tasks with a beautiful and intuitive interface. Add rich text notes,
                deadlines, and priorities.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Share2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Task Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easily share tasks with team members, friends, or family. Collaborate on projects and stay in sync with
                everyone's progress.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calendar View</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize your tasks and deadlines in a beautiful calendar interface. Get a clear overview of your
                schedule and never miss a deadline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using TaskShare to stay organized and collaborate effectively.
          </p>
          <Link href="/dashboard">
            <Button size="lg">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold">TaskShare</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Help
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TaskShare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
