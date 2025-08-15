"use client"
import type React from "react"
import { useState } from "react"
import { User, UserPlus, Search, ArrowLeft } from "lucide-react"

interface Cliente {
  id: string
  nombre: string
  telefono: string
  direccion: string
  documento: string
}

type ClienteView = "buttons" | "alta" | "buscar"

interface ClientSectionProps {
  clientes: Cliente[]
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>
  invoiceData: any
  setInvoiceData: React.Dispatch<React.SetStateAction<any>>
  client: any
}

export function ClientSection({ clientes, setClientes, invoiceData, setInvoiceData, client }: ClientSectionProps) {
  const [clienteView, setClienteView] = useState<ClienteView>("buttons")
  const [nuevoClienteData, setNuevoClienteData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    documento: "",
  })

  const handleSeleccionCliente = (id: string) => {
    const idNum = Number(id)
    const cliente = clientes.find((c) => Number(c.id) === idNum)
    if (cliente) {
      setInvoiceData({
        ...invoiceData,
        clienteNombre: cliente.nombre,
        clienteTelefono: cliente.telefono,
        clienteDireccion: cliente.direccion,
        clienteDocumento: cliente.documento,
      })
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

    fetch("http://localhost:8000/save_client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nuevoClienteData.nombre,
        direccion: nuevoClienteData.direccion,
        telefono: nuevoClienteData.telefono,
        documento: nuevoClienteData.documento,
        emisor: client.documento,
      }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || "Error al guardar el cliente")
        }
        console.log("Respuesta del backend:", data)

        setClientes((prev) => [...prev, nuevoCliente])
        setInvoiceData((prev) => ({
          ...prev,
          clienteNombre: nuevoClienteData.nombre,
          clienteTelefono: nuevoClienteData.telefono,
          clienteDireccion: nuevoClienteData.direccion,
          clienteDocumento: nuevoClienteData.documento,
        }))

        setNuevoClienteData({ nombre: "", telefono: "", direccion: "", documento: "" })
        setClienteView("buttons")
      })
      .catch((err) => {
        console.error("Error al guardar el cliente:", err.message)
        alert(`${err.message}`)
      })
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
                  <p>
                    <strong>Documento:</strong> {invoiceData.clienteDocumento}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Documento</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  type="text"
                  value={nuevoClienteData.documento}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNuevoClienteData((prev) => ({ ...prev, documento: e.target.value }))
                  }
                  placeholder="Ingrese el documento de identidad"
                />
              </div>
              <div>
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
                <option value="">Seleccionar cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre} - {cliente.documento}
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
  )
}