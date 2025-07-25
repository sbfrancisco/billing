"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Trash2, User, Package, FileText, Save, ArrowLeft, UserPlus, Search } from "lucide-react"
import { InvoiceView } from "../components/InvoiceView"

interface Cliente {
  id: string
  nombre: string
  telefono: string
  direccion: string
}

type ClienteView = "buttons" | "alta" | "buscar"

export function GeneratePage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteView, setClienteView] = useState<ClienteView>("buttons")
  const [nuevoClienteData, setNuevoClienteData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  })
  const [invoiceData, setInvoiceData] = useState({
    emisorNombre: "Daniel Natale",
    emisorTelefono: "+54 9 3468565097",
    emisorDireccion: "San Juan 241, Guatimozin, Córdoba",
    clienteNombre: "",
    clienteTelefono: "",
    clienteDireccion: "",
    fechaEmision: new Date().toLocaleDateString("es-AR"),
    periodoDesde: new Date().toLocaleDateString("es-AR"),
    periodoHasta: new Date().toLocaleDateString("es-AR"),
    fechaVencimiento: new Date().toLocaleDateString("es-AR"),
    condicionVenta: "Contado",
    numeroComprobante: "00000001",
    items: [
      {
        id: "1",
        codigo: "001",
        descripcion: "Producto o servicio ejemplo",
        cantidad: 1,
        unidadMedida: "unidades",
        precioUnitario: 1000,
        bonificacion: 0,
        importeBonif: 0,
        subtotal: 1000,
        esServicio: false,
        esTemporal: false,
      },
    ],
    subtotal: 1000,
    otrosTributos: 0,
    total: 1000,
    cae: "12345678901234",
    fechaVencimientoCae: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString("es-AR"),
    certificacion: "Certificación profesional ejemplo",
  })
  const [showForm, setShowForm] = useState(true)
  const [invoiceGenerated, setInvoiceGenerated] = useState(false)

  useEffect(() => {
    setClientes([
      {
        id: "1",
        nombre: "Carlos Pérez",
        telefono: "111-222-3333",
        direccion: "Calle Falsa 123",
      },
      {
        id: "2",
        nombre: "Lucía Gómez",
        telefono: "444-555-6666",
        direccion: "Av. Siempreviva 742",
      },
    ])
  }, [])

  const handleSeleccionCliente = (id: string) => {
    const cliente = clientes.find((c) => c.id === id)
    if (cliente) {
      setInvoiceData((prev) => ({
        ...prev,
        clienteNombre: cliente.nombre,
        clienteTelefono: cliente.telefono,
        clienteDireccion: cliente.direccion,
      }))
      setClienteView("buttons")
    }
  }

  const handleGuardarNuevoCliente = () => {
    if (!nuevoClienteData.nombre.trim()) {
      alert("El nombre del cliente es obligatorio")
      return
    }

    const nuevoCliente: Cliente = {
      id: Date.now().toString(),
      ...nuevoClienteData,
    }

    setClientes((prev) => [...prev, nuevoCliente])
    setInvoiceData((prev) => ({
      ...prev,
      clienteNombre: nuevoClienteData.nombre,
      clienteTelefono: nuevoClienteData.telefono,
      clienteDireccion: nuevoClienteData.direccion,
    }))

    // Limpiar formulario y volver a botones
    setNuevoClienteData({ nombre: "", telefono: "", direccion: "" })
    setClienteView("buttons")
  }

  const addItem = (tipo: "producto" | "servicio" = "producto") => {
    const newItem = {
      id: Date.now().toString(),
      codigo: "",
      descripcion: "",
      cantidad: 1,
      unidadMedida: tipo === "servicio" ? "horas" : "unidades",
      precioUnitario: 0,
      bonificacion: 0,
      importeBonif: 0,
      subtotal: 0,
      esServicio: tipo === "servicio",
      esTemporal: false,
    }
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
  }

  const removeItem = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
    calculateTotals()
  }

  const updateItem = (id: string, field: string, value: any) => {
    setInvoiceData((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (["cantidad", "precioUnitario", "bonificacion"].includes(field)) {
            const cantidad = field === "cantidad" ? value : updatedItem.cantidad
            const precio = field === "precioUnitario" ? value : updatedItem.precioUnitario
            const bonif = field === "bonificacion" ? value : updatedItem.bonificacion
            updatedItem.importeBonif = (cantidad * precio * bonif) / 100
            updatedItem.subtotal = cantidad * precio - updatedItem.importeBonif
          }
          return updatedItem
        }
        return item
      })
      return { ...prev, items: updatedItems }
    })
    setTimeout(calculateTotals, 0)
  }

  const calculateTotals = () => {
    setInvoiceData((prev) => {
      const subtotal = prev.items.reduce((sum, item) => sum + item.subtotal, 0)
      const total = subtotal + prev.otrosTributos
      return { ...prev, subtotal, total }
    })
  }

  if (!showForm) {
    return (
      <InvoiceView
        invoiceData={invoiceData}
        invoiceGenerated={invoiceGenerated}
        onEdit={() => setShowForm(true)}
        onSave={() => {
          console.log("Guardando factura en base de datos:", invoiceData)
          alert("Factura guardada en la base de datos correctamente")
          setInvoiceGenerated(false)
        }}
      />
    )
  }

  const renderClienteSection = () => {
    switch (clienteView) {
      case "buttons":
        return (
          <div className="p-6 space-y-4">
            {invoiceData.clienteNombre && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Cliente seleccionado:</h4>
                <div className="text-sm text-green-700">
                  <p>
                    <strong>Nombre:</strong> {invoiceData.clienteNombre}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {invoiceData.clienteTelefono}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {invoiceData.clienteDireccion}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-3"
                onClick={() => setClienteView("alta")}
              >
                <UserPlus className="w-5 h-5" />
                Dar de alta cliente
              </button>
              <button
                className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-3"
                onClick={() => setClienteView("buscar")}
              >
                <Search className="w-5 h-5" />
                Buscar cliente registrado
              </button>
            </div>
          </div>
        )

      case "alta":
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setClienteView("buttons")}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h4 className="text-lg font-medium text-gray-800">Registrar nuevo cliente</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido *</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  type="text"
                  value={nuevoClienteData.nombre}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNuevoClienteData((prev) => ({ ...prev, nombre: e.target.value }))
                  }
                  placeholder="Ingrese el nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  type="text"
                  value={nuevoClienteData.telefono}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNuevoClienteData((prev) => ({ ...prev, telefono: e.target.value }))
                  }
                  placeholder="Ingrese el teléfono"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  type="text"
                  value={nuevoClienteData.direccion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNuevoClienteData((prev) => ({ ...prev, direccion: e.target.value }))
                  }
                  placeholder="Ingrese la dirección completa"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                onClick={handleGuardarNuevoCliente}
              >
                Guardar Cliente
              </button>
              <button
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                onClick={() => setClienteView("buttons")}
              >
                Cancelar
              </button>
            </div>
          </div>
        )

      case "buscar":
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setClienteView("buttons")}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h4 className="text-lg font-medium text-gray-800">Seleccionar cliente registrado</h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clientes disponibles</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  if (e.target.value) {
                    handleSeleccionCliente(e.target.value)
                  }
                }}
                defaultValue=""
              >
                <option value="">-- Seleccionar cliente --</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre} - {cliente.telefono}
                  </option>
                ))}
              </select>
            </div>
            {clientes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No hay clientes registrados</p>
                <button
                  className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => setClienteView("alta")}
                >
                  Registrar el primer cliente
                </button>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Generador de Facturas</h1>
          <p className="text-gray-600 mt-2">Crea y gestiona tus facturas de manera profesional</p>
        </div>
        <div className="space-y-6">
          {/* Datos del Cliente */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Información del Cliente
              </h3>
              <p className="text-sm text-gray-600 mt-1">Selecciona un cliente existente o registra uno nuevo</p>
            </div>
            {renderClienteSection()}
          </div>

          {/* Items */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-green-600" />
                Productos y Servicios
              </h3>
              <p className="text-sm text-gray-600 mt-1">Agrega los productos y servicios a facturar</p>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  onClick={() => addItem("producto")}
                >
                  <Plus className="w-4 h-4" />
                  Agregar Producto
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                  onClick={() => addItem("servicio")}
                >
                  <Plus className="w-4 h-4" />
                  Agregar Servicio
                </button>
              </div>
              <div className="space-y-4">
                {invoiceData.items.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            item.esServicio ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.esServicio ? "Servicio" : "Producto"}
                        </span>
                        {item.esTemporal && (
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            Temporal
                          </span>
                        )}
                      </div>
                      <button
                        className="px-2 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Código</label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          type="text"
                          value={item.codigo}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateItem(item.id, "codigo", e.target.value)
                          }
                          placeholder="COD001"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          type="text"
                          value={item.descripcion}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateItem(item.id, "descripcion", e.target.value)
                          }
                          placeholder="Descripción del item"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Cantidad</label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          type="number"
                          value={item.cantidad}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateItem(item.id, "cantidad", Number.parseFloat(e.target.value) || 0)
                          }
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Precio Unit.</label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          type="number"
                          value={item.precioUnitario}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateItem(item.id, "precioUnitario", Number.parseFloat(e.target.value) || 0)
                          }
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Subtotal</label>
                        <div className="text-sm font-semibold py-2 px-3 bg-gray-50 rounded-md border">
                          ${item.subtotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {/* Checkbox para servicios temporales */}
                    <div className="mt-4 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`temporal-${item.id}`}
                        checked={item.esTemporal || false}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateItem(item.id, "esTemporal", e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`temporal-${item.id}`} className="text-sm text-gray-700">
                        Marcar como servicio temporal
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {/* Totales */}
              {invoiceData.items.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <div className="w-80 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">${invoiceData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Otros tributos:</span>
                        <span className="font-medium">${invoiceData.otrosTributos.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-blue-600">${invoiceData.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botones finales */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {invoiceGenerated && (
                  <button
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                    onClick={() => {
                      console.log("Guardando factura:", invoiceData)
                      alert("Factura guardada correctamente")
                    }}
                  >
                    <Save className="w-4 h-4" />
                    Guardar Factura
                  </button>
                )}
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setShowForm(false)
                    setInvoiceGenerated(true)
                  }}
                  disabled={!invoiceData.clienteNombre || invoiceData.items.length === 0}
                >
                  <FileText className="w-4 h-4" />
                  Ver Factura
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
