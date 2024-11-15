import { Loader } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader className="h-20 w-20 animate-spin text-blue-500" />
    </div>
  )
}
