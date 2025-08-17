"use client"

import { useState, useEffect } from "react"
import { Printer } from "lucide-react"
import { getStatusColor, formatCurrency } from "../utils/billUtils"
import { InvoiceView } from "../components/InvoiceView"

// 👉 datos mock
const mockBills = [
  {
    id: 101,
    client_name: "Juan Pérez",
    fecha: "2025-08-10",
    status: "pagada",
    fechaEmision: "2025-08-10",
    emisorNombre: "Empresa XYZ",
    emisorTelefono: "12345678",
    emisorDireccion: "Calle Falsa 123",
    clienteNombre: "Juan Pérez",
    clienteTelefono: "11223344",
    clienteDireccion: "Av. Siempre Viva 742",
    periodoDesde: "2025-08-01",
    periodoHasta: "2025-08-10",
    fechaVencimiento: "2025-08-20",
    condicionVenta: "Contado",
    numeroComprobante: 101,
    items: [
      { id: "1", codigo: "001", descripcion: "Servicio de Hosting", cantidad: 1, unidadMedida: "unidades", precioUnitario: 10000, bonificacion: 0, importeBonif: 0, subtotal: 10000 },
      { id: "2", codigo: "002", descripcion: "Soporte técnico", cantidad: 2, unidadMedida: "horas", precioUnitario: 1250, bonificacion: 0, importeBonif: 0, subtotal: 2500 },
    ],
    subtotal: 12500,
    otrosTributos: 0,
    total: 12500,
    cae: "12345678901234",
    fechaVencimientoCae: "2025-08-30",
    certificacion: "Certificación profesional ejemplo",
  },
]

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [bills, setBills] = useState<any[]>([])
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null)
  const [invoiceGenerated, setInvoiceGenerated] = useState(false)

  // Simular carga de facturas
  useEffect(() => {
    setBills(mockBills)
  }, [])

  const handleEdit = () => {
    console.log("Editar factura", selectedInvoice)
  }

  const handleSave = () => {
    console.log("Guardar factura", selectedInvoice)
    setInvoiceGenerated(true)
  }

  // 🔹 Función para volver atrás y resetear la factura
  const handleBack = () => {
    setSelectedInvoice(null)
    setInvoiceGenerated(false)
  }

  return (
    <div className="space-y-6">
      {selectedInvoice ? (
        <div>
          {/* Botón Volver */}
          <div className="mb-4">
            <button
          onClick={handleBack}
          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1"
          >
        Volver
      </button>

          </div>

          <InvoiceView
            invoiceData={selectedInvoice}
            only_read={true}
            invoiceGenerated={invoiceGenerated}
            onEdit={handleEdit}
            onSave={handleSave}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Buscar Facturas</h3>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por cliente</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre del cliente..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Todos los estados</option>
                <option value="pagada">Pagada</option>
                <option value="pendiente">Pendiente</option>
                <option value="vencida">Vencida</option>
              </select>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factura</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bills
                  .filter(
                    (invoice) =>
                      searchTerm === "" ||
                      invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{invoice.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.client_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.fecha}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(invoice.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            invoice.status,
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Ver
                        </button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Editar</button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Printer className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
