"use client"

import { useState } from "react"
import { Package, Plus, Save, Trash2, Search, Edit3 } from "lucide-react"

interface Service {
  id: string
  nombre: string
  precio: number
  esServicio: boolean
}

export function ProductRegisterPage() {
  const [services, setServices] = useState<Service[]>([])
  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">("list")
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "productos" | "servicios">("all")

  const [newService, setNewService] = useState<Omit<Service, "id">>({
    nombre: "",
    precio: 0,
    esServicio: false,
  })

  const resetForm = () => {
    setNewService({
      nombre: "",
      precio: 0,
      esServicio: false,
    })
  }

  const handleSaveService = () => {
    if (!newService.nombre.trim()) {
      alert("El nombre es obligatorio")
      return
    }

    if (newService.precio <= 0) {
      alert("El precio debe ser mayor a 0")
      return
    }

    const serviceToSave = {
      ...newService,
      id: Date.now().toString(),
    }

    setServices((prev) => [...prev, serviceToSave])
    resetForm()
    setCurrentView("list")
    alert("Guardado correctamente")
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setNewService({ ...service })
    setCurrentView("edit")
  }

  const handleUpdateService = () => {
    if (!editingService) return

    if (!newService.nombre.trim()) {
      alert("El nombre es obligatorio")
      return
    }

    if (newService.precio <= 0) {
      alert("El precio debe ser mayor a 0")
      return
    }

    setServices((prev) => prev.map((s) => (s.id === editingService.id ? { ...newService, id: editingService.id } : s)))
    resetForm()
    setEditingService(null)
    setCurrentView("list")
    alert("Actualizado correctamente")
  }

  const handleDeleteService = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      setServices((prev) => prev.filter((s) => s.id !== id))
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.nombre.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterType === "all" ||
      (filterType === "productos" && !service.esServicio) ||
      (filterType === "servicios" && service.esServicio)

    return matchesSearch && matchesFilter
  })

  const renderServiceForm = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          {currentView === "edit" ? "Editar" : "Registrar"} {newService.esServicio ? "Servicio" : "Producto"}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Complete la información del {newService.esServicio ? "servicio" : "producto"}
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="tipo"
                checked={!newService.esServicio}
                onChange={() => setNewService((prev) => ({ ...prev, esServicio: false }))}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Producto</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tipo"
                checked={newService.esServicio}
                onChange={() => setNewService((prev) => ({ ...prev, esServicio: true }))}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Servicio</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            type="text"
            value={newService.nombre}
            onChange={(e) => setNewService((prev) => ({ ...prev, nombre: e.target.value }))}
            placeholder="Nombre del producto/servicio"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            type="number"
            value={newService.precio}
            onChange={(e) => setNewService((prev) => ({ ...prev, precio: Number.parseFloat(e.target.value) || 0 }))}
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            onClick={currentView === "edit" ? handleUpdateService : handleSaveService}
          >
            <Save className="w-4 h-4" />
            {currentView === "edit" ? "Actualizar" : "Guardar"}
          </button>
          <button
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            onClick={() => {
              resetForm()
              setEditingService(null)
              setCurrentView("list")
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )

  const renderServiceList = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Package className="w-5 h-5 text-green-600" />
          Productos y Servicios Registrados
        </h3>
        <p className="text-sm text-gray-600 mt-1">Gestiona tu catálogo de productos y servicios</p>
      </div>

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "all" | "productos" | "servicios")}
          >
            <option value="all">Todos</option>
            <option value="productos">Solo Productos</option>
            <option value="servicios">Solo Servicios</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            onClick={() => setCurrentView("add")}
          >
            <Plus className="w-4 h-4" />
            Nuevo
          </button>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">
              {services.length === 0 ? "No hay registros" : "No se encontraron resultados"}
            </p>
            <p className="mb-4">
              {services.length === 0
                ? "Comienza registrando tu primer producto o servicio"
                : "Intenta con otros términos de búsqueda"}
            </p>
            {services.length === 0 && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                onClick={() => setCurrentView("add")}
              >
                Registrar primero
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        service.esServicio ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {service.esServicio ? "Servicio" : "Producto"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nombre</p>
                    <p className="font-medium">{service.nombre}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Precio</p>
                    <p className="font-medium text-green-600">${service.precio.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Registro de Productos y Servicios</h1>
          <p className="text-gray-600 mt-2">Gestiona tu catálogo de manera simple y eficiente</p>
        </div>

        <div className="space-y-6">
          {currentView === "list" && renderServiceList()}
          {(currentView === "add" || currentView === "edit") && renderServiceForm()}
        </div>
      </div>
    </div>
  )
}