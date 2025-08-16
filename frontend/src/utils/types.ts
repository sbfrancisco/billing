export type ClienteView = "existente" | "nuevo" | "buttons"

export interface Cliente {
  id: string
  nombre: string
  telefono: string
  direccion: string
  documento: string
}

export interface NuevoClienteData {
  nombre: string
  telefono: string
  direccion: string
  documento: string
}

export interface Sale{
  id: string
  quantity: number
  price: number
}

export interface Service{
  id: string
  descripcion: string
  precio: number
  esServicio: boolean
  esTemporal: boolean
}

 export interface Bill {
  id: string
  sales: Sale[]
  total: number
  status: string
  emisor: string
  receptor: string
  fecha: string
  client_name: string
}

export interface InvoiceItem {
  id: string
  descripcion: string
  cantidad: number
  precio: number
  total: number
  esServicio: boolean
  esTemporal: boolean
}

export interface InvoiceData {
  clienteNombre: string
  clienteTelefono: string
  clienteDireccion: string
  clienteDocumento: string
  items: InvoiceItem[]
  subtotal: number
  otrosTributos: number
  total: number
  numeroFactura: string
  fecha: string
}