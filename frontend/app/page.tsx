"use client"

import Link from "next/link"
import { Plus, Search, BarChart3, LogIn, UserPlus } from "lucide-react"

export default function HomePage() {
  // Datos de ejemplo para el dashboard
  const dashboardStats = {
    totalFacturas: 156,
    facturasEsteMes: 23,
    ingresosTotales: 2450000,
    ingresosEsteMes: 345000,
    clientesActivos: 45,
    promedioFactura: 15700,
  }

  const recentInvoices = [
    { id: "001", cliente: "Juan Pérez", fecha: "2024-01-15", total: 25000, estado: "Pagada" },
    { id: "002", cliente: "María García", fecha: "2024-01-14", total: 18500, estado: "Pendiente" },
    { id: "003", cliente: "Carlos López", fecha: "2024-01-13", total: 32000, estado: "Pagada" },
    { id: "004", cliente: "Ana Martínez", fecha: "2024-01-12", total: 12000, estado: "Vencida" },
    { id: "005", cliente: "Luis Rodríguez", fecha: "2024-01-11", total: 28000, estado: "Pagada" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pagada":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Vencida":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg text-white p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Sistema de Gestión de Facturas</h1>
          <p className="text-xl mb-6 text-blue-100">
            Gestiona tus facturas de manera eficiente y profesional. Crea, analiza y organiza toda tu facturación en un
            solo lugar.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Registrarse
            </Link>
          </div>
        </div>
      </div>

      {/* Características principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Crear Facturas</h3>
          <p className="text-gray-600">
            Genera facturas profesionales de manera rápida y sencilla con nuestro editor intuitivo.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis Detallado</h3>
          <p className="text-gray-600">
            Obtén insights valiosos sobre tus ingresos, clientes y tendencias de facturación.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Búsqueda Avanzada</h3>
          <p className="text-gray-600">
            Encuentra cualquier factura rápidamente con nuestros filtros avanzados de búsqueda.
          </p>
        </div>
      </div>

      {/* Estadísticas de demostración */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">¿Por qué elegir nuestro sistema?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{dashboardStats.totalFacturas}+</div>
            <p className="text-gray-600">Facturas Procesadas</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatCurrency(dashboardStats.ingresosTotales)}
            </div>
            <p className="text-gray-600">En Transacciones</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{dashboardStats.clientesActivos}+</div>
            <p className="text-gray-600">Clientes Satisfechos</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
            <p className="text-gray-600">Tiempo de Actividad</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 rounded-lg shadow-lg text-white p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="text-xl mb-6 text-gray-300">
          Únete a miles de profesionales que ya confían en nuestro sistema de facturación.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Crear Cuenta Gratis
          </Link>
          <Link
            href="/login"
            className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Ya tengo cuenta
          </Link>
        </div>
      </div>

      {/* Vista previa de facturas (solo visual) */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Vista Previa del Sistema</h3>
          <p className="text-gray-600">Así se ven las facturas en nuestro sistema</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInvoices.slice(0, 5).map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(invoice.total)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.estado)}`}
                    >
                      {invoice.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
