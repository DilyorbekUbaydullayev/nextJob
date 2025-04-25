"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { useSpecialist } from "@/hooks/use-specialists"
import { AtSign, Briefcase, Mail, Phone, User2 } from "lucide-react"
import Link from "next/link"
import { notFound, useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useDeleteJob, useDeleteSpecial } from "@/hooks/use-jobs"

export default function SpecialistDetailPage() {
   const params = useParams()
   const router = useRouter();
    const specialistId = params?.id as string;
  const { data: specialist, isLoading, error } = useSpecialist(specialistId)
  const { isAuthenticated } = useAuth()
const {
    mutate: deleteJob,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteSpecial({
    onSuccess: () => {
      router.push("/jobs");
    },
    onError: (err) => {
      console.error("Delete error:", err);
    },
  });
  if (error) {
    return notFound()
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">
                    {specialist?.first_name?.[0]}
                    {specialist?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {specialist?.first_name} {specialist?.last_name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{specialist?.position}</span>
                  </div>
                </div>
              </div>
              {isAuthenticated && (
                <div className="flex gap-2">
                  <Link href={`/specialists/${params.id}/edit`}>
                    <Button variant="outline">Edit Job</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={() => {
                      if (
                        confirm(`"${specialist?.title}" ishini oʻchirmoqchimisiz?`)
                      ) {
                        deleteJob(specialistId);
                      }
                    }}
                  >
                    {isDeleting ? "Oʻchirilmoqda…" : "Delete Job"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{specialist?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{specialist?.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AtSign className="h-5 w-5 text-muted-foreground" />
                      <span>{specialist?.username}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User2 className="h-5 w-5 text-muted-foreground" />
                      <span>{specialist?.age} years old</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <Button size="lg">Contact Specialist</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
