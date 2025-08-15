"use client"

import { useEffect } from "react"
import { CheckCircle, AlertCircle, X } from "lucide-react"

interface SimpleAlertProps {
  show: boolean
  success: boolean
  message: string
  onClose: () => void
}

export default function SimpleAlert({ show, success, message, onClose }: SimpleAlertProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // Se oculta después de 3 segundos

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div
        className={`p-4 rounded-lg shadow-lg border flex items-center gap-3 ${
          success ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        {success ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-600" />
        )}
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
