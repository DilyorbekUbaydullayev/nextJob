"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useJob } from "@/hooks/use-jobs";
import { formatDate } from "@/lib/utils";
import { Building, Calendar, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";

import { DeleteJobModal } from "@/components/delete-modal-job";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id as string;

  const { data: job, isLoading, error } = useJob(jobId);
  const { isAuthenticated } = useAuth();

  if (error) {
    return notFound();
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
    );
  }

  return (
    <div className="container py-8 mx-auto">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl max-md:text-xl font-bold tracking-tight">
                  {job?.title}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{job?.company}</span>
                </div>
              </div>
              {isAuthenticated && (
                <div className="flex gap-2">
                  <Link href={`/jobs/${params.id}/edit`}>
                    <Button variant="outline" className='w-[75px]'>Edit </Button>
                  </Link>
                  <DeleteJobModal jobId={jobId} title={job.title} />
                </div>
              )}
            </div>
            <div className=" container mx-auto max-sm:px-4 flex flex-wrap gap-3 mt-4 ">
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job?.location}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(job?.time)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />${job?.salary}
              </Badge>
              <Badge>{job?.work_type}</Badge>
            </div>
          </div>
 
          <Card className="mx-auto max-sm:mx-4">
            <CardContent className="pt-6 ">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="whitespace-pre-line">{job?.description}</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <Button size="lg">Apply for this position</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
