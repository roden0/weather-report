"use client"

import { createContext, useState, useContext, useMemo, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already authenticated
    return localStorage.getItem("isAuthenticated") === "true"
  })

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    // Simple validation for demo purposes
    if (email && password) {
      setIsAuthenticated(true)
      localStorage.setItem("isAuthenticated", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
