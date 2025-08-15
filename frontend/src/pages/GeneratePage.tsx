"use client"
import { useState, useEffect } from "react"
import { FileText, Save } from "lucide-react"
import { InvoiceView } from "../components/InvoiceView"
import { ClientSection } from "./sections/ClientSection"
import { ServicesSection } from "./sections/ServicesSection"
import { getUserFromLocalStorage } from "../utils/userStorage"
import { fetchClientes, fetchLastVoucherNumber } from "../utils/api"
import type { Cliente } from "../utils/types"


export function GeneratePage() {
  const cliente = getUserFromLocalStorage()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [invoiceData, setInvoiceData] = useState({
    emisorNombre: cliente.name,
    emisorTelefono: cliente.telefono,
    emisorDireccion: cliente.direccion,
    clienteNombre: "",
    clienteTelefono: "",
    clienteDireccion: "",
    clienteDocumento: "",
    fechaEmision: new Date().toLocaleDateString("es-AR"),
    periodoDesde: new Date().toLocaleDateString("es-AR"),
    periodoHasta: new Date().toLocaleDateString("es-AR"),
    fechaVencimiento: new Date().toLocaleDateString("es-AR"),
    condicionVenta: "Contado",
    numeroComprobante: 0,
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

  useEffect(() => {
    const loadVoucherNumber = async () => {
      try {
        const numero = await fetchLastVoucherNumber()
        setInvoiceData((prev) => ({
          ...prev,
          numeroComprobante: numero,
        }))
      } catch (error) {
        console.error("Error cargando número de comprobante:", error)
      }
    }

    loadVoucherNumber()
  }, [])
  const [showForm, setShowForm] = useState(true)
  const [invoiceGenerated, setInvoiceGenerated] = useState(false)
  const client = getUserFromLocalStorage()

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const data = await fetchClientes()
        setClientes(data)
        if (data.length > 0 && data[0].id === "1") {
          console.log("[v0] Usando datos de prueba - inicia tu servidor backend en localhost:8000 para datos reales")
        }
      } catch (err) {
        console.error("Error al cargar clientes:", err)
        alert("No se pudieron cargar los clientes.")
      }
    }

    loadClientes()
  }, [])

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Generador de Facturas</h1>
          <p className="text-gray-600 mt-2">Crea y gestiona tus facturas de manera profesional</p>
        </div>
        <div className="space-y-6">
          <ClientSection
            clientes={clientes}
            setClientes={setClientes}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            client={client}
          />

          <ServicesSection
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />

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
