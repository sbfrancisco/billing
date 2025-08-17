"use client"

import { useState } from "react"
import { Printer } from "lucide-react"

interface InvoiceViewProps {
  invoiceData: any
  invoiceGenerated: boolean
  onEdit: () => void
  onSave: () => void
  only_read: boolean
}

export function InvoiceView({ invoiceData, invoiceGenerated, onEdit, onSave, only_read }: InvoiceViewProps) {
  const [copyType, setCopyType] = useState("ORIGINAL")

  const handlePrint = () => {
    window.print()
  }

  
  return (
    <div className="space-y-6">
      {/* Controles de impresión */}
      <div className="print:hidden bg-white border-b p-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          {!only_read && (<div className="flex gap-2">
            <select
              value={copyType}
              onChange={(e) => setCopyType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ORIGINAL">ORIGINAL</option>
              <option value="DUPLICADO">DUPLICADO</option>
              <option value="TRIPLICADO">TRIPLICADO</option>
            </select>
          </div>)}

          <div className="flex gap-2">
            {invoiceGenerated && (
              <button
                onClick={onSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Guardar Factura
              </button>
            )}
            {!only_read && (<button
              onClick={onEdit}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Editar
            </button>)}
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Factura */}
      <div className="max-w-4xl mx-auto bg-white print:max-w-none print:mx-0">
        {/* Encabezado */}
        <div className="border-2 border-black">
          {/* Primera fila del encabezado */}
          <div className="flex">
            <div className="flex-1 p-2 border-r border-black">
              <div className="text-xs">Fecha de Emisión:</div>
              <div className="font-bold text-sm">{invoiceData.fechaEmision}</div>
            </div>
            <div className="w-20 border-r border-black flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="font-bold text-lg">FACTURA</div>
              </div>
            </div>
            <div className="flex-1 p-2">
              <div className="font-bold text-sm">{copyType}</div>
            </div>
          </div>

          {/* Datos del emisor */}
          <div className="border-t border-black p-3">
            <div className="font-bold text-sm mb-1">{invoiceData.emisorNombre}</div>
            <div className="text-xs mb-2">{invoiceData.emisorDireccion}</div>
            <div className="text-xs">
              <span className="font-semibold">Teléfono:</span> {invoiceData.emisorTelefono}
            </div>
          </div>

          {/* Período y datos de venta */}
          <div className="border-t border-black">
            <div className="flex text-xs">
              <div className="flex-1 p-2 border-r border-black">
                <span className="font-semibold">Período Facturado Desde:</span> {invoiceData.periodoDesde}
              </div>
              <div className="flex-1 p-2 border-r border-black">
                <span className="font-semibold">Hasta:</span> {invoiceData.periodoHasta}
              </div>
              <div className="flex-1 p-2">
                <span className="font-semibold">Fecha de Vto. para el pago:</span> {invoiceData.fechaVencimiento}
              </div>
            </div>
          </div>

          {/* Datos del cliente */}
          <div className="border-t border-black">
            <div className="flex text-xs">
              <div className="flex-1 p-2 border-r border-black">
                <span className="font-semibold">Condición de venta:</span> {invoiceData.condicionVenta}
              </div>
            </div>
          </div>

          <div className="border-t border-black">
            <div className="flex text-xs">
              <div className="flex-1 p-2 border-r border-black">
                <span className="font-semibold">Nombre y Apellido:</span>
                <br />
                {invoiceData.clienteNombre}
              </div>
              <div className="flex-1 p-2">
                <span className="font-semibold">Teléfono:</span> {invoiceData.clienteTelefono}
              </div>
            </div>
          </div>

          <div className="border-t border-black">
            <div className="flex text-xs">
              <div className="flex-1 p-2 border-r border-black">
                <span className="font-semibold">Dirección:</span> {invoiceData.clienteDireccion}
              </div>
              <div className="w-32 p-2">
                <span className="font-semibold">Comp. Nro:</span>
                <br />
                {invoiceData.numeroComprobante}
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="border-l-2 border-r-2 border-black">
          {/* Encabezado de tabla */}
          <div className="bg-gray-100 border-b border-black">
            <div className="flex text-xs font-semibold">
              <div className="w-16 p-2 border-r border-black text-center">Código</div>
              <div className="flex-1 p-2 border-r border-black">Producto / Servicio</div>
              <div className="w-20 p-2 border-r border-black text-center">Cantidad</div>
              <div className="w-20 p-2 border-r border-black text-center">U. Medida</div>
              <div className="w-24 p-2 border-r border-black text-center">Precio Unit.</div>
              <div className="w-20 p-2 border-r border-black text-center">% Bonif</div>
              <div className="w-24 p-2 border-r border-black text-center">Imp. Bonif.</div>
              <div className="w-24 p-2 text-center">Subtotal</div>
            </div>
          </div>

          {/* Filas de productos */}
          {invoiceData.items.map((item: any) => (
            <div key={item.id} className="border-b border-gray-300">
              <div className="flex text-xs">
                <div className="w-16 p-2 border-r border-gray-300 text-center">{item.codigo}</div>
                <div className="flex-1 p-2 border-r border-gray-300">{item.descripcion}</div>
                <div className="w-20 p-2 border-r border-gray-300 text-center">{item.cantidad.toFixed(2)}</div>
                <div className="w-20 p-2 border-r border-gray-300 text-center">{item.unidadMedida}</div>
                <div className="w-24 p-2 border-r border-gray-300 text-right">{item.precioUnitario.toFixed(2)}</div>
                <div className="w-20 p-2 border-r border-gray-300 text-center">{item.bonificacion.toFixed(2)}</div>
                <div className="w-24 p-2 border-r border-gray-300 text-right">{item.importeBonif.toFixed(2)}</div>
                <div className="w-24 p-2 text-right">{item.subtotal.toFixed(2)}</div>
              </div>
            </div>
          ))}

          {/* Espacios en blanco para completar la página */}
          {Array.from({ length: Math.max(0, 10 - invoiceData.items.length) }).map((_, index) => (
            <div key={`empty-${index}`} className="border-b border-gray-300">
              <div className="flex text-xs">
                <div className="w-16 p-2 border-r border-gray-300">&nbsp;</div>
                <div className="flex-1 p-2 border-r border-gray-300">&nbsp;</div>
                <div className="w-20 p-2 border-r border-gray-300">&nbsp;</div>
                <div className="w-20 p-2 border-r border-gray-300">&nbsp;</div>
                <div className="w-24 p-2 border-r border-gray-300">&nbsp;</div>
                <div className="w-20 p-2 border-r border-gray-300">&nbsp;</div>
                <div className="w-24 p-2 border-r border-gray-300">&nbsp;</div>
                <div className="w-24 p-2">&nbsp;</div>
              </div>
            </div>
          ))}
        </div>

        {/* Totales */}
        <div className="border-2 border-t-0 border-black">
          <div className="flex justify-end">
            <div className="w-80">
              <div className="flex text-xs border-b border-gray-300">
                <div className="flex-1 p-2 font-semibold">Subtotal:</div>
                <div className="w-24 p-2 text-right">$ {invoiceData.subtotal.toFixed(2)}</div>
              </div>
              <div className="flex text-xs border-b border-gray-300">
                <div className="flex-1 p-2 font-semibold">Importe Otros Tributos:</div>
                <div className="w-24 p-2 text-right">$ {invoiceData.otrosTributos.toFixed(2)}</div>
              </div>
              <div className="flex text-xs font-bold">
                <div className="flex-1 p-2">Importe Total:</div>
                <div className="w-24 p-2 text-right">$ {invoiceData.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="border-2 border-t-0 border-black p-3">
          <div className="flex justify-between text-xs mb-2">
            <div>
              <span className="font-semibold">CAE N°:</span> {invoiceData.cae}
            </div>
            <div>
              <span className="font-semibold">Fecha de Vto. de CAE:</span> {invoiceData.fechaVencimientoCae}
            </div>
          </div>

          <div className="text-center text-xs mb-2">
            <div className="font-semibold">Comprobante Autorizado</div>
            <div>Esta Agencia no se responsabiliza por los datos ingresados en el detalle de la operación</div>
          </div>

          <div className="text-xs text-center border border-black p-2 bg-gray-50">{invoiceData.certificacion}</div>

          <div className="text-right text-xs mt-2">Pág. 1/1</div>
        </div>
      </div>
    </div>
  )
}

