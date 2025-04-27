"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Menu, BriefcaseBusiness } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="pr-0"
          aria-label="Mobile navigation menu"
        >
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              
            </SheetDescription>
          </SheetHeader>

          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <BriefcaseBusiness className="h-6 w-6 mr-2" />
            <span className="font-bold">NextJob</span>
          </Link>

          <div className="flex flex-col space-y-3 mt-6">
            <Link
              href="/jobs"
              onClick={() => setOpen(false)}
              className={cn(
                "text-foreground/60 transition-colors hover:text-foreground/80",
                pathname.startsWith("/jobs") && "text-foreground font-medium"
              )}
            >
              Jobs
            </Link>
            <Link
              href="/specialists"
              onClick={() => setOpen(false)}
              className={cn(
                "text-foreground/60 transition-colors hover:text-foreground/80",
                pathname.startsWith("/specialists") && "text-foreground font-medium"
              )}
            >
              Specialists
            </Link>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="justify-start mx-0 px-1"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={cn(
                  "text-foreground/60 transition-colors hover:text-foreground/80",
                  pathname.startsWith("/login") && "text-foreground font-medium"
                )}
              >
                Login
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
