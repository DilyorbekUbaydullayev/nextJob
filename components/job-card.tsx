import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import type { Job } from "@/types"
import { Building, Calendar, DollarSign, MapPin } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{job.company}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-muted-foreground">{job.description}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <Badge>{job.work_type}</Badge>
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>${job.salary}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 border-t flex flex-wrap gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {job.ish_vaqti}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
