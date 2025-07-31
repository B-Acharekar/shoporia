import { XCircle, CheckCircle, AlertTriangle } from "lucide-react"

interface ToastProps {
  type: "success" | "error" | "info"
  message: string
}

export default function CustomToast({ type, message }: ToastProps) {
  const icons = {
    success: <CheckCircle className="text-green-400 w-5 h-5" />,
    error: <XCircle className="text-red-400 w-5 h-5" />,
    info: <AlertTriangle className="text-yellow-400 w-5 h-5" />,
  }

  return (
    <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg px-4 py-3 w-80">
      {icons[type]}
      <span className="text-sm text-white">{message}</span>
    </div>
  )
}
