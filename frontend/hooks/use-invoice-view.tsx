"use client"

import { useState, useEffect } from "react"

interface Cliente {
  id: string
  nombre: string
  telefono: string
  direccion: string
}

interface InvoiceItem {
  id: string
  codigo: string
  descripcion: string
  cantidad: number
  unidadMedida: string
  precioUnitario: number
  bonificacion: number
  importeBonif: number
  subtotal: number
}

interface InvoiceData {
  fechaEmision: string
  emisorNombre: string
  emisorDireccion: string
  emisorTelefono: string
  periodoDesde: string
  periodoHasta: string
  fechaVencimiento: string
  condicionVenta: string
  clienteNombre: string
  clienteTelefono: string
  clienteDireccion: string
  numeroComprobante: string
  items: InvoiceItem[]
  subtotal: number
  otrosTributos: number
  total: number
  cae: string
  fechaVencimientoCae: string
  certificacion: string
}

export function useInvoiceView() {
  const [clientes] = useState<Cliente[]>([
    {
      id: "1",
      nombre: "Juan Pérez",
      telefono: "11-1234-5678",
      direccion: "Av. Corrientes 1234, CABA",
    },
    {
      id: "2",
      nombre: "María García",
      telefono: "11-8765-4321",
      direccion: "Av. Santa Fe 5678, CABA",
    },
  ])

  const [clienteView, setClienteView] = useState<"existente" | "nuevo">("existente")
  const [nuevoClienteData, setNuevoClienteData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  })

  const [showForm, setShowForm] = useState(true)
  const [invoiceGenerated, setInvoiceGenerated] = useState(false)

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    fechaEmision: new Date().toLocaleDateString("es-AR"),
    emisorNombre: "Mi Empresa S.A.",
    emisorDireccion: "Av. Rivadavia 1234, Buenos Aires",
    emisorTelefono: "11-1234-5678",
    periodoDesde: new Date().toLocaleDateString("es-AR"),
    periodoHasta: new Date().toLocaleDateString("es-AR"),
    fechaVencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("es-AR"),
    condicionVenta: "Contado",
    clienteNombre: "",
    clienteTelefono: "",
    clienteDireccion: "",
    numeroComprobante: "001-001-00000001",
    items: [],
    subtotal: 0,
    otrosTributos: 0,
    total: 0,
    cae: "74123456789012",
    fechaVencimientoCae: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("es-AR"),
    certificacion: "Comprobante Autorizado por AFIP - Resolución General N° 4291/2018",
  })

  const handleSeleccionCliente = (cliente: Cliente) => {
    setInvoiceData((prev) => ({
      ...prev,
      clienteNombre: cliente.nombre,
      clienteTelefono: cliente.telefono,
      clienteDireccion: cliente.direccion,
    }))
  }

  const handleGuardarNuevoCliente = () => {
    setInvoiceData((prev) => ({
      ...prev,
      clienteNombre: nuevoClienteData.nombre,
      clienteTelefono: nuevoClienteData.telefono,
      clienteDireccion: nuevoClienteData.direccion,
    }))
    setNuevoClienteData({ nombre: "", telefono: "", direccion: "" })
    setClienteView("existente")
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      codigo: "",
      descripcion: "",
      cantidad: 1,
      unidadMedida: "UN",
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
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalcular subtotal
          const importeBonif = (updatedItem.precioUnitario * updatedItem.cantidad * updatedItem.bonificacion) / 100
          updatedItem.importeBonif = importeBonif
          updatedItem.subtotal = updatedItem.precioUnitario * updatedItem.cantidad - importeBonif

          return updatedItem
        }
        return item
      }),
    }))
  }

  // Recalcular totales cuando cambien los items
  useEffect(() => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.subtotal, 0)
    const otrosTributos = subtotal * 0.21 // IVA 21%
    const total = subtotal + otrosTributos

    setInvoiceData((prev) => ({
      ...prev,
      subtotal,
      otrosTributos,
      total,
    }))
  }, [invoiceData.items])

  return {
    clientes,
    clienteView,
    setClienteView,
    nuevoClienteData,
    setNuevoClienteData,
    invoiceData,
    showForm,
    setShowForm,
    invoiceGenerated,
    setInvoiceGenerated,
    handleSeleccionCliente,
    handleGuardarNuevoCliente,
    addItem,
    removeItem,
    updateItem,
  }
}
