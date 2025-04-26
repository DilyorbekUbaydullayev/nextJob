"use client"

import { authFetch } from "@/lib/utils"
import type { User } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const API_URL = "https://mustafocoder.pythonanywhere.com/api"


export function useSpecialists() {
  return useQuery({
    queryKey: ["specialists"],
    queryFn: async () => {
      const response = await authFetch(`${API_URL}/users/`)
      if (!response.ok) {
        throw new Error("Failed to fetch specialists")
      }
      return response.json()
    },
  })
}


export function useSpecialist(id: string) {
  return useQuery({
    queryKey: ["specialist", id],
    queryFn: async () => {
      const response = await authFetch(`${API_URL}/users/${id}/`)
      if (!response.ok) {
        throw new Error("Failed to fetch specialist")
      }
      return response.json()
    },
  })
}


export function useCreateSpecialist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: Omit<User, "id">) => {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication required")
      }

      const response = await authFetch(`${API_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error("Failed to create specialist")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] })
    },
  })
}


export function useUpdateSpecialist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: User) => {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication required")
      }

      const { id, ...data } = userData

      const response = await authFetch(`${API_URL}/users/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update specialist")
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] })
      queryClient.invalidateQueries({ queryKey: ["specialist", data.id] })
    },
  })
}


export function useDeleteSpecialist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication required")
      }

      const response = await authFetch(`${API_URL}/users/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete specialist")
      }

      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] })
    },
  })
}
