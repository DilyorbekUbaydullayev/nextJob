import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to jobs page
  redirect("/jobs")
}
