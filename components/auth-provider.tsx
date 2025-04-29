"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { type User, findUserByEmail, createUser, updateUserProfile } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  demoLogin: () => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<User | null>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  demoLogin: async () => false,
  signup: async () => false,
  logout: () => {},
  updateProfile: async () => null,
  isLoading: true,
})

// Update the demo user email
export const DEMO_USER = {
  email: "demo@livwell.com",
  password: "demo123",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const foundUser = findUserByEmail(email)

    if (foundUser && foundUser.password === password) {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      })
      return true
    }

    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    })
    return false
  }

  const demoLogin = async () => {
    // Demo user credentials
    const demoUser = {
      id: "demo-user",
      name: "Demo User",
      email: DEMO_USER.email,
      password: DEMO_USER.password,
      address: "123 Demo Street, Demo City, 12345",
      phone: "555-123-4567",
    }

    // Check if demo user exists, if not create it
    const existingUser = findUserByEmail(demoUser.email)
    if (!existingUser) {
      createUser({
        name: demoUser.name,
        email: demoUser.email,
        password: demoUser.password,
        address: demoUser.address,
        phone: demoUser.phone,
      })
    }

    // Login as demo user
    setUser(existingUser || demoUser)
    localStorage.setItem("user", JSON.stringify(existingUser || demoUser))

    toast({
      title: "Demo login successful",
      description: "You are now logged in as a demo user",
    })

    return true
  }

  const signup = async (name: string, email: string, password: string) => {
    const existingUser = findUserByEmail(email)

    if (existingUser) {
      toast({
        title: "Signup failed",
        description: "Email already in use",
        variant: "destructive",
      })
      return false
    }

    const newUser = createUser({ name, email, password })
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))

    toast({
      title: "Account created",
      description: "Your account has been created successfully",
    })
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return null

    const updatedUser = updateUserProfile(user.id, data)
    if (updatedUser) {
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    }

    return updatedUser
  }

  return (
    <AuthContext.Provider value={{ user, login, demoLogin, signup, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
