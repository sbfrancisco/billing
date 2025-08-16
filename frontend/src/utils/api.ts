import type { Cliente, Service, Bill } from "./types"
import { getUserFromLocalStorage } from "./userStorage"

export async function fetchClientes(): Promise<Cliente[]> {
  const client = getUserFromLocalStorage()

  try {
    const response = await fetch("http://localhost:8000/clients?id=" + client.documento)
    if (!response.ok) {
      throw new Error("Error al cargar clientes")
    }
    return await response.json()
  } catch (error) {
    console.error("Error al cargar clientes:", error)
    throw error
  }
}

export async function saveCliente(clienteData: Omit<Cliente, "id">): Promise<void> {
  const client = getUserFromLocalStorage()

  try {
    const response = await fetch("http://localhost:8000/save_client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...clienteData,
        emisor: client.documento,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || "Error al guardar el cliente")
    }
  } catch (error) {
    console.error("Error al guardar cliente:", error)
    throw error
  }
}


export async function fetchLastVoucherNumber(): Promise<number> {
   try {
    const response = await fetch(
      `http://localhost:8000/last_voucher_number`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data.last_voucher_number;
} catch (error) {
    console.error("Error al cargar el último número de comprobante:", error);
    throw error;
  }
}

export async function saveBill(bill: Bill): Promise<Bill>{
  try {
    const response = await fetch("http://localhost:8000/save_bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bill),
    })

    if (!response.ok) {
      throw new Error("Error al guardar la factura")
    }

    const data = await response.json()
    return data.bill as Bill
  } catch (error) {
    console.error("Error en saveBill:", error)
    throw error
  }

}

export async function fetchServices(): Promise<Service[]> {
  const client = getUserFromLocalStorage();

  try {
    const response = await fetch(
      `http://localhost:8000/services?transmitter=${client.documento}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    const frontendServices: Service[] = data.services.map((s: any) => ({
      id: s.id.toString(),
      descripcion: s.nombre,
      precio: parseFloat(s.price_base),
      esServicio: s.isService,
      transmitter: s.transmitter,
    }));

    return frontendServices;
  } catch (error) {
    console.error("Error al cargar servicios:", error);
    throw error;
  }
}

export async function fetchBills(): Promise<any[]> {
  const client = getUserFromLocalStorage()
  try {
    const response = await fetch(`http://localhost:8000/fetch_bills?transmitter=${client.documento}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log("facturas obtenidas:", data)
    return data;
  } catch (error) {
    console.error("Error al obtener las facturas que emitiste:", error)
    throw error
  }
}