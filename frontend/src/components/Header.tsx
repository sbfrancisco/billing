"use client"

import { Link, useLocation } from "react-router-dom"
import { FileText, Plus, BarChart3, Search, LayoutDashboard, LogOut, User } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const location = useLocation()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("user")

    if (isAuthenticated && userData) {
      setUser(JSON.parse(userData))
    }
  }, [location])

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  // No mostrar header en las páginas de autenticación
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null
  }

  return (
    <header className="bg-white shadow-sm border-b print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Sistema de Facturas</h1>
          </Link>

          {/* Navegación */}
          {user ? (
            // Usuario autenticado - Solo funcionalidades del sistema
            <nav className="flex space-x-8">
              <Link
                to="/dashboard"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>

              <Link
                to="/generate"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/generate")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Generar
              </Link>

              <Link
                to="/analytics"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/analytics")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analizar
              </Link>

                <Link
                to="/personal-data"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/search")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Search className="h-4 w-4 mr-2" />
                Mis datos
              </Link>

              <Link
                to="/search"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/search")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Link>
            </nav>
          ) : (
            // Usuario NO autenticado - Solo navegación básica
            <nav className="flex space-x-4">
              
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Registrarse
              </Link>
            </nav>
          )}

          {/* Usuario autenticado - Info y logout */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Salir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
