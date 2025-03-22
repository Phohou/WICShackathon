import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <p className="mt-4 text-lg font-medium text-primary">Loading...</p>
    </div>
  )
}

