"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const API_URL = "https://mustafocoder.pythonanywhere.com/api"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { username: string; password: string }) => Promise<void>
  register: (credentials: { username: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
const router = useRouter()
  useEffect(() => {
   
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      if (token) {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    
    if (typeof window !== "undefined") {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (credentials: { username: string; password: string }) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      localStorage.setItem("token", data.access)
      localStorage.setItem("refreshToken", data.refresh)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: { username: string; password: string }) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      await response.json()
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    setIsAuthenticated(false)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push('/login')
    
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
