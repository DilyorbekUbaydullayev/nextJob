"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Dispatch, SetStateAction } from "react"

interface JobFiltersProps {
  filters: {
    location: string
    workType: string
  }
  setFilters: Dispatch<
    SetStateAction<{
      location: string
      workType: string
    }>
  >
}

export function JobFilters({ filters, setFilters }: JobFiltersProps) {
  const locations = ["Tashkent", "Samarkand", "Bukhara", "Andijan", "Namangan"]
  const workTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Remote"]

  const resetFilters = () => {
    setFilters({
      location: "",
      workType: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Narrow down your job search</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Work Type</label>
          <Select value={filters.workType} onValueChange={(value) => setFilters({ ...filters, workType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {workTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset
        </Button>
      </CardContent>
    </Card>
  )
}
