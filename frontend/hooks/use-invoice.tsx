"use client"
import { useState, useEffect } from "react"
import { getUserFromLocalStorage } from "@/utils/userStorage"
import { calculateTotals } from "@/utils/calculations"
import { DEFAULT_INVOICE_DATA } from "@/constants/defaults"

export function useInvoice() {
  const [clientes, setClientes] = useState([])
  const [clienteView, setClienteView] = useState("buttons")
  const [nuevoClienteData, setNuevoClienteData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    documento: "",
  })
  const [showForm, setShowForm] = useState(true)
  const [invoiceGenerated, setInvoiceGenerated] = useState(false)
  const [invoiceData, setInvoiceData] = useState(() => {
    const userData = getUserFromLocalStorage()
    return {
      ...DEFAULT_INVOICE_DATA,
      emisorNombre: userData.nombre,
      emisorTelefono: userData.telefono,
      emisorDireccion: userData.direccion,
    }
  })

  // Cargar clientes al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        // Simulamos datos de clientes para desarrollo
        const mockClientes = [
          {
            id: 1,
            nombre: "Juan Pérez",
            telefono: "123-456-7890",
            direccion: "Calle Falsa 123",
            documento: "12345678",
          },
          {
            id: 2,
            nombre: "María García",
            telefono: "098-765-4321",
            direccion: "Av. Principal 456",
            documento: "87654321",
          },
        ]
        setClientes(mockClientes)
      } catch (error) {
        console.error("Error cargando clientes:", error)
        setClientes([])
      }
    }

    fetchClientes()
  }, [])

  const handleSeleccionCliente = (cliente) => {
    setInvoiceData((prev) => ({
      ...prev,
      clienteNombre: cliente.nombre,
      clienteTelefono: cliente.telefono,
      clienteDireccion: cliente.direccion,
      clienteDocumento: cliente.documento,
    }))
    setClienteView("buttons")
  }

  const handleGuardarNuevoCliente = () => {
    if (!nuevoClienteData.nombre || !nuevoClienteData.telefono) {
      alert("Por favor completa al menos el nombre y teléfono del cliente")
      return
    }

    const nuevoCliente = {
      id: Date.now(),
      ...nuevoClienteData,
    }

    setClientes((prev) => [...prev, nuevoCliente])
    handleSeleccionCliente(nuevoCliente)
    setNuevoClienteData({
      nombre: "",
      telefono: "",
      direccion: "",
      documento: "",
    })
  }

  const addItem = (tipo) => {
    const nuevoItem = {
      id: Date.now(),
      codigo: "",
      descripcion: "",
      cantidad: 1,
      unidadMedida: "UN",
      precioUnitario: 0,
      bonificacion: 0,
      importeBonif: 0,
      subtotal: 0,
      esServicio: tipo === "servicio",
      esTemporal: false,
    }

    setInvoiceData((prev) => {
      const newItems = [...prev.items, nuevoItem]
      const totals = calculateTotals(newItems)
      return {
        ...prev,
        items: newItems,
        ...totals,
      }
    })
  }

  const removeItem = (id) => {
    setInvoiceData((prev) => {
      const newItems = prev.items.filter((item) => item.id !== id)
      const totals = calculateTotals(newItems)
      return {
        ...prev,
        items: newItems,
        ...totals,
      }
    })
  }

  const updateItem = (id, field, value) => {
    setInvoiceData((prev) => {
      const newItems = prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalcular subtotal del item
          const cantidad = Number.parseFloat(updatedItem.cantidad) || 0
          const precioUnitario = Number.parseFloat(updatedItem.precioUnitario) || 0
          const bonificacion = Number.parseFloat(updatedItem.bonificacion) || 0

          const subtotalSinBonif = cantidad * precioUnitario
          const importeBonif = (subtotalSinBonif * bonificacion) / 100
          const subtotal = subtotalSinBonif - importeBonif

          return {
            ...updatedItem,
            importeBonif,
            subtotal,
          }
        }
        return item
      })

      const totals = calculateTotals(newItems)
      return {
        ...prev,
        items: newItems,
        ...totals,
      }
    })
  }

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
