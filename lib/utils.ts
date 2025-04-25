import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// src/utils/authFetch.ts

const API_URL = "https://mustafocoder.pythonanywhere.com/api"

const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken")
  if (!refresh) throw new Error("No refresh token found")

  const response = await fetch(`${API_URL}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  })

  if (!response.ok) throw new Error("Token refresh failed")

  const data = await response.json()
  localStorage.setItem("token", data.access)
  return data.access
}

export const authFetch = async (url: string, options: RequestInit = {}) => {
  let token = localStorage.getItem("token")

  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }

  let response = await fetch(url, authOptions)

  // Token eskirgan bo‘lsa, yangilaydi va qayta so‘rov yuboradi
  if (response.status === 401) {
    try {
      token = await refreshToken()
      const retryOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
      response = await fetch(url, retryOptions)
    } catch (error) {
      console.error("Token refresh failed. Logging out.")
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      window.location.href = "/login"
    }
  }

  return response
}
