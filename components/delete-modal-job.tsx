
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useDeleteJob } from '@/hooks/use-jobs'

interface DeleteJobModalProps {
  jobId: string
  title: string
}

export function DeleteJobModal({ jobId, title }: DeleteJobModalProps) {
  const [open, setOpen] = useState(false)
  const deleteMutation = useDeleteJob()
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className='w-[75px]'>
          Delete 
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ish o‘chirilsinmi?</DialogTitle>
          <DialogDescription>
            “{title}” ishini oʻchirmoqchimisiz? Bu amal qaytarib boʻlmaydi.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
           Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteMutation.mutate(jobId, {
                onSuccess: () => {
                  toast({ description: 'Job deleted successfully' })
                  router.push('/jobs')
                },
                onError: (err: Error) => {
                  console.error('Delete error:', err.message)
                },
              })
              setOpen(false)
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
