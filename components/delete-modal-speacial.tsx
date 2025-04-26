
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
import { useDeleteSpecialist } from '@/hooks/use-specialists'
import { toast } from '@/hooks/use-toast'

interface DeleteSpecialistModalProps {
  specialistId: string
  title: string
}

export function DeleteSpecialistModal({ specialistId, title }: DeleteSpecialistModalProps) {
  const [open, setOpen] = useState(false)
  const deleteMutation = useDeleteSpecialist()
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ishni o‘chirilsinmi?</DialogTitle>
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
              deleteMutation.mutate(specialistId, {
                onSuccess: () => {
                  toast({ description: 'Specialist deleted successfully' })
                  router.push('/specialists')
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
