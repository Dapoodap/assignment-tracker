"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")
//   const { register, isLoading, error } = useAuthStore()
  const router = useRouter()
//   const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
setLoading(true)
    // Reset error
    setPasswordError("")

    // Validate passwords match
    if (password !== confirmPassword) {
        setLoading(false)

      setPasswordError("Passwords do not match")
      return
    }

    try {
const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:"DAFFA",
          email,
          password,
        }),
      });
    //   toast({
    //     title: "Registration successful",
    //     description: "Please complete your profile",
    //   })
    const data = await response.json();

      if (!response.ok) {
        setLoading(false)
        setError(data.message);
        throw new Error(data.message || 'Terjadi kesalahan saat mendaftar');
      }
      setLoading(false)

      router.push("/dashboard")
    } catch (err) {
        setLoading(false)
        // setError(err/)
      // Error is already handled in the store
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <span className="text-2xl font-bold">TaskShare</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter your details to create your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
