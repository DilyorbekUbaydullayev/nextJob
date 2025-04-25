"use client"

import { JobCard } from "@/components/job-card"
import { JobFilters } from "@/components/job-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useJobs } from "@/hooks/use-jobs"
import type { Job } from "@/types"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"

export default function JobsPage() {
  const { data: jobs, isLoading } = useJobs()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    workType: "",
  })
  const { isAuthenticated } = useAuth()

  const filteredJobs = jobs?.filter((job: Job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = !filters.location || job.location === filters.location
    const matchesWorkType = !filters.workType || job.work_type === filters.workType

    return matchesSearch && matchesLocation && matchesWorkType
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container py-8 mx-auto px-8">
      <div className="flex flex-col md:flex-row justify-between px-4 items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
          <p className="text-muted-foreground mt-1">Find your next career opportunity</p>
        </div>
        {isAuthenticated && (
          <Link href="/jobs/create">
            <Button>Post a Job</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1">
          <JobFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="lg:col-span-3">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company or keywords..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
              ))}
            </div>
          ) : filteredJobs?.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No jobs found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
              {filteredJobs?.map((job: Job) => (
                <motion.div key={job.id} variants={item}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
