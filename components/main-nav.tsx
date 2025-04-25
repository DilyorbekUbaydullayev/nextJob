"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { BriefcaseBusiness } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="mr-4 hidden  md:flex  px-8">
      <Link href="/" className="mr-8 flex items-center  space-x-2">
        <BriefcaseBusiness className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">NextJob</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/jobs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/jobs") ? "text-foreground font-medium" : "text-foreground/60",
          )}
        >
          Jobs
        </Link>
        <Link
          href="/specialists"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/specialists") ? "text-foreground font-medium" : "text-foreground/60",
          )}
        >
          Specialists
        </Link>
        {isAuthenticated ? (
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link
            href="/login"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname.startsWith("/login") ? "text-foreground font-medium" : "text-foreground/60",
            )}
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  )
}
