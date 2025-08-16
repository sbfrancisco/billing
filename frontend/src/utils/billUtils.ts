import type { Bill } from "./types";


  export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(amount);

  export const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

export async function fetchBills(transmitter: string): Promise<Bill[]> {
  const response = await fetch(`http://localhost:8000/fetch_bills?transmitter=${transmitter}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  return (data.bills || []).map((bill: any) => ({
    id: bill.id.toString(),
    sales: bill.sales || [],
    total: parseFloat(bill.total),
    status: bill.status,
    emisor: bill.emisor,
    receptor: bill.receptor,
    client_name: bill.client_name,
    fecha: bill.fecha
  }));
}
