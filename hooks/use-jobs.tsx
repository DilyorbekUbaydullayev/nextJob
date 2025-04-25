"use client"

import { authFetch } from "@/lib/utils"
import type { Job } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type DeleteJobOptions = {
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

const API_URL = "https://mustafocoder.pythonanywhere.com/api"

// Fetch all jobs
export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await authFetch(`${API_URL}/jobs/`)
      if (!response.ok) {
        throw new Error("Failed to fetch jobs")
      }
      return response.json()
    },
  })
}

// Fetch a single job by ID
export function useJob(id: string) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await authFetch(`${API_URL}/jobs/${id}/`)
      if (!response.ok) {
        throw new Error("Failed to fetch job")
      }
      return response.json()
    },
  })
}

// Create a new job
export function useCreateJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (jobData: Omit<Job, "id">) => {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication required")
      }

      const response = await authFetch(`${API_URL}/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      })

      if (!response.ok) {
        throw new Error("Failed to create job")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
    },
  })
}

// Update an existing job
export function useUpdateJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (jobData: Job) => {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication required")
      }

      const { id, ...data } = jobData

      const response = await authFetch(`${API_URL}/jobs/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update job")
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      queryClient.invalidateQueries({ queryKey: ["job", data.id] })
    },
  })
}


export function useDeleteJob(options?: DeleteJobOptions) {
  const queryClient = useQueryClient()

  return useMutation<string, Error, string>({
    // <ResultType, ErrorType, VariablesType>
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Authentication required")

      const res = await authFetch(`${API_URL}/jobs/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error("Failed to delete job")
      return id
    },
    onSuccess: (deletedId) => {
      // 1) cache’ni yangilaymiz
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      // 2) tashqi callback-ni chaqiramiz
      options?.onSuccess?.()
    },
    onError: (err) => {
      options?.onError?.(err)
    },
  })
}
export function useDeleteSpecial(options?: DeleteJobOptions) {
  const queryClient = useQueryClient()

  return useMutation<string, Error, string>({
    // <ResultType, ErrorType, VariablesType>
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Authentication required")

      const res = await authFetch(`${API_URL}/specialists/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error("Failed to delete job")
      return id
    },
    onSuccess: (deletedId) => {
      // 1) cache’ni yangilaymiz
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      // 2) tashqi callback-ni chaqiramiz
      options?.onSuccess?.()
    },
    onError: (err) => {
      options?.onError?.(err)
    },
  })
}
