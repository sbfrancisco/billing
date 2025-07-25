"use client"

import { Link, Navigate } from "react-router-dom"
import { Plus, Search, BarChart3, LogIn, UserPlus, Shield, Clock, Users } from "lucide-react"
import { useEffect, useState } from "react"

export function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const authStatus = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(authStatus === "true")
  }, [])

  // Si está cargando, mostrar loading
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Si está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // Si no está autenticado, mostrar landing page
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg text-white p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Sistema de Gestión de Facturas</h1>
          <p className="text-xl mb-6 text-blue-100">
            La solución completa para gestionar tus facturas de manera eficiente y profesional. Crea, organiza y
            controla toda tu facturación desde un solo lugar.
          </p>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Comenzar Gratis
            </Link>
            <Link
              to="/login"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Iniciar Sesión
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

      {/* Beneficios */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">¿Por qué elegir nuestro sistema?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Seguro y Confiable</h3>
            <p className="text-gray-600">Tus datos están protegidos con los más altos estándares de seguridad.</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ahorra Tiempo</h3>
            <p className="text-gray-600">Automatiza tu proceso de facturación y enfócate en hacer crecer tu negocio.</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Soporte 24/7</h3>
            <p className="text-gray-600">Nuestro equipo está disponible para ayudarte cuando lo necesites.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Final */}
      <div className="bg-gray-900 rounded-lg shadow-lg text-white p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="text-xl mb-6 text-gray-300">Únete a miles de profesionales que ya confían en nuestro sistema.</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Crear Cuenta Gratis
          </Link>
          <Link
            to="/login"
            className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}
