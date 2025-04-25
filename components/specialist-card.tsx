import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { User } from "@/types"
import { AtSign, Briefcase, Mail, Phone } from "lucide-react"
import Link from "next/link"

interface SpecialistCardProps {
  specialist: User
}

export function SpecialistCard({ specialist }: SpecialistCardProps) {
  return (
    <Link href={`/specialists/${specialist.id}`}>
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarFallback className="text-xl">
                {specialist.first_name?.[0]}
                {specialist.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">
              {specialist.first_name} {specialist.last_name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{specialist.position}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 border-t flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{specialist.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{specialist.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <AtSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{specialist.username}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
