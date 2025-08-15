import type { InvoiceData } from "@/utils/types"

export const DEFAULT_INVOICE_DATA: InvoiceData = {
  emisorNombre: "Daniel Natale",
  emisorTelefono: "+54 9 3468565097",
  emisorDireccion: "San Juan 241, Guatimozin, Córdoba",
  clienteNombre: "",
  clienteTelefono: "",
  clienteDireccion: "",
  clienteDocumento: "",
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
}

export const DEFAULT_NUEVO_CLIENTE = {
  nombre: "",
  telefono: "",
  direccion: "",
  documento: "",
}