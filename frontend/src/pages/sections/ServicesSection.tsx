"use client"
import type React from "react"
import { Package, Plus, Trash2, List } from "lucide-react"
import { useState } from "react"
import { fetchServices } from "../../utils/api"
import type { Service } from "../../utils/types"

interface ServicesSectionProps {
  invoiceData: any
  setInvoiceData: React.Dispatch<React.SetStateAction<any>>
  addItem: (tipo: "producto" | "servicio") => void
  removeItem: (id: string) => void
  updateItem: (id: string, field: string, value: any) => void
}

export function ServicesSection({
  invoiceData,
  setInvoiceData,
  addItem,
  removeItem,
  updateItem,
}: ServicesSectionProps) {
  const [showServicesModal, setShowServicesModal] = useState(false)
  const [availableServices, setAvailableServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(false)

  const handleUtilizarServicios = async () => {
    setLoadingServices(true)
    try {
      const services = await fetchServices()
      setAvailableServices(services)
      setShowServicesModal(true)
    } catch (error) {
      console.error("Error al cargar servicios:", error)
      alert("No se pudieron cargar los servicios disponibles")
    } finally {
      setLoadingServices(false)
    }
  }

  const addServiceFromAPI = (service: Service) => {
  const newItem = {
    id: Date.now().toString(),
    codigo: service.id,
    descripcion: service.descripcion,
    cantidad: 1,
    unidadMedida: service.esServicio ? "horas" : "unidades",
    precioUnitario: service.precio,
    bonificacion: 0,
    importeBonif: 0,
    subtotal: service.precio,
    esServicio: service.esServicio,
    esTemporal: service.esTemporal,
  };

  setInvoiceData((prev: any) => {
    const updatedItems = [...prev.items, newItem];

    // recalcular subtotal
    const subtotal = updatedItems.reduce((acc, item) => acc + item.subtotal, 0);

    // recalcular total (suponiendo que otrosTributos se suman al subtotal)
    const total = subtotal + (prev.otrosTributos || 0);

    return {
      ...prev,
      items: updatedItems,
      subtotal,
      total,
    };
  });

  setShowServicesModal(false);
};


  return (
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
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
            onClick={handleUtilizarServicios}
            disabled={loadingServices}
          >
            <List className="w-4 h-4" />
            {loadingServices ? "Cargando..." : "Utilizar Servicios"}
          </button>
        </div>

        {showServicesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Seleccionar Servicios</h3>
                <p className="text-sm text-gray-600 mt-1">Elige los servicios que deseas agregar a la factura</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {availableServices.map((service) => (
                    <div
                      key={service.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                service.esServicio ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {service.esServicio ? "Servicio" : "Producto"}
                            </span>
                            {service.esTemporal && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                Temporal
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium text-gray-900">{service.descripcion}</h4>
                          <p className="text-sm text-gray-600">Código: {service.id}</p>
                          <p className="text-lg font-semibold text-green-600">${service.precio.toFixed(2)}</p>
                        </div>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                          onClick={() => addServiceFromAPI(service)}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                  onClick={() => setShowServicesModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {invoiceData.items.map((item: any) => (
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateItem(item.id, "codigo", e.target.value)}
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
  )
}
