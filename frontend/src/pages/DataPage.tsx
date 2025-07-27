import { getUserFromLocalStorage } from "@/utils/userStorage"
import { User, Mail, Building, MapPin, FileText, Phone } from "lucide-react"

export function DataPage() {
  const client = getUserFromLocalStorage()

  const clientData = [
    { label: "Nombre", value: client?.name, icon: User },
    { label: "Email", value: client?.email, icon: Mail },
    { label: "Empresa", value: client?.company, icon: Building },
    { label: "Dirección", value: client?.direccion, icon: MapPin },
    { label: "Documento", value: client?.documento, icon: FileText },
    { label: "Teléfono", value: client?.telefono, icon: Phone },
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="space-y-1">
          {clientData.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className="group flex items-center py-4 px-1 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="flex items-center min-w-0 flex-1">
                  <IconComponent className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-gray-900 truncate">{item.value || "No especificado"}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
  )
}
