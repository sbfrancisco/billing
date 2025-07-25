"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { NAME, PHONE, ADDRESS } from "../../constants/invoice"
import { InvoiceView } from "./components/invoice-view"

export default function GeneratePage() {
  const [invoiceData, setInvoiceData] = useState({
    emisorNombre: NAME,
    emisorTelefono: PHONE,
    emisorDireccion: ADDRESS,

    clienteNombre: "Nombre del Cliente",
    clienteTelefono: "(098) 765-4321",
    clienteDireccion: "Dirección del Cliente",

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

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      codigo: "",
      descripcion: "",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 0,
      bonificacion: 0,
      importeBonif: 0,
      subtotal: 0,
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

          if (field === "cantidad" || field === "precioUnitario" || field === "bonificacion") {
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

      return {
        ...prev,
        subtotal,
        total,
      }
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

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Editor de Factura</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                console.log("Guardando factura:", invoiceData)
                alert("Factura guardada correctamente")
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Guardar Factura
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Datos del Cliente */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Datos del Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido</label>
              <input
                type="text"
                value={invoiceData.clienteNombre}
                onChange={(e) => setInvoiceData((prev) => ({ ...prev, clienteNombre: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="text"
                value={invoiceData.clienteTelefono}
                onChange={(e) => setInvoiceData((prev) => ({ ...prev, clienteTelefono: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input
                type="text"
                value={invoiceData.clienteDireccion}
                onChange={(e) => setInvoiceData((prev) => ({ ...prev, clienteDireccion: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Productos/Servicios</h3>
            <button
              onClick={addItem}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Item
            </button>
          </div>

          <div className="space-y-4">
            {invoiceData.items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                    <input
                      type="text"
                      value={item.codigo}
                      onChange={(e) => updateItem(item.id, "codigo", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <input
                      type="text"
                      value={item.descripcion}
                      onChange={(e) => updateItem(item.id, "descripcion", e.target.value)}
                      placeholder="Descripción del producto o servicio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                    <input
                      type="number"
                      value={item.cantidad}
                      onChange={(e) => updateItem(item.id, "cantidad", Number.parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unit.</label>
                    <input
                      type="number"
                      value={item.precioUnitario}
                      onChange={(e) => updateItem(item.id, "precioUnitario", Number.parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones finales */}
        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={() => {
              console.log("Guardando factura:", invoiceData)
              alert("Factura guardada correctamente")
            }}
            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Guardar Factura
          </button>
          <button
            onClick={() => {
              setShowForm(false)
              setInvoiceGenerated(true)
            }}
            className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Ver Factura
          </button>
        </div>
      </div>
    </div>
  )
}
