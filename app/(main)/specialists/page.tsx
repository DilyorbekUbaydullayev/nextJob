"use client"

import { SpecialistCard } from "@/components/specialist-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { useSpecialists } from "@/hooks/use-specialists"
import type { User } from "@/types"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function SpecialistsPage() {
  const { data: specialists, isLoading } = useSpecialists()
  const [searchTerm, setSearchTerm] = useState("")
  const { isAuthenticated } = useAuth()

  const filteredSpecialists = specialists?.filter((specialist: User) => {
    const fullName = `${specialist.first_name} ${specialist.last_name}`.toLowerCase()
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      specialist.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialist.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Specialists</h1>
          <p className="text-muted-foreground mt-1">Find talented professionals for your projects</p>
        </div>
        {isAuthenticated && (
          <Link href="/specialists/create">
            <Button>Add Specialist</Button>
          </Link>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search specialists by name, position or email..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[220px] w-full rounded-lg" />
          ))}
        </div>
      ) : filteredSpecialists?.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No specialists found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredSpecialists?.map((specialist: User) => (
            <motion.div key={specialist.id} variants={item}>
              <SpecialistCard specialist={specialist} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
