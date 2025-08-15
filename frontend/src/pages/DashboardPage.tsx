import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, BarChart3, FileText, DollarSign, Users, Calendar, Clock } from "lucide-react";
import { getUserFromLocalStorage } from "@/utils/userStorage";

export function DashboardPage() {
  interface StatusTransmitter {
    bills: number;
    clients: number;
    income: number;
    pending: number;
  }

  const [dashboardStats, setDashboardStats] = useState({
    totalFacturas: 0,
    facturasEsteMes: 0,
    ingresosTotales: 0,
    ingresosEsteMes: 0,
    clientesActivos: 0,
    promedioFactura: 0,
    facturasPendientes: 0,
    facturasVencidas: 0,
  });

  const client = getUserFromLocalStorage();

  useEffect(() => {
    async function loadDashboard() {
      const response = await fetch("http://localhost:8000/data_transmitter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documento: client.documento }),
      });

      const status_transmitter: StatusTransmitter = await response.json();

      setDashboardStats({
        totalFacturas: status_transmitter.bills,
        facturasEsteMes: 23,
        ingresosTotales: status_transmitter.income,
        ingresosEsteMes: 345000,
        clientesActivos: status_transmitter.clients,
        promedioFactura: 15700,
        facturasPendientes: status_transmitter.pending,
        facturasVencidas: 3,
      });
    }

    loadDashboard();
  }, [client.documento]);

  const recentInvoices = [
    { id: "001", cliente: "Juan Pérez", fecha: "2024-01-15", total: 25000, estado: "Pagada" },
    { id: "002", cliente: "María García", fecha: "2024-01-14", total: 18500, estado: "Pendiente" },
    { id: "003", cliente: "Carlos López", fecha: "2024-01-13", total: 32000, estado: "Pagada" },
    { id: "004", cliente: "Ana Martínez", fecha: "2024-01-12", total: 12000, estado: "Vencida" },
    { id: "005", cliente: "Luis Rodríguez", fecha: "2024-01-11", total: 28000, estado: "Pagada" },
  ];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(amount);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pagada": return "bg-green-100 text-green-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Vencida": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };



  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Resumen de tu actividad de facturación</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Última actualización</p>
            <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString("es-AR")}</p>
          </div>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Facturas</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalFacturas}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+{dashboardStats.facturasEsteMes} este mes</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardStats.ingresosTotales)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">{formatCurrency(dashboardStats.ingresosEsteMes)} este mes</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Facturas Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">{dashboardStats.facturasPendientes}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">{dashboardStats.facturasVencidas} vencidas</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.clientesActivos}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+5 nuevos este mes</p>
        </div>
      </div>

     <div className="flex justify-center">

        {/* Acciones rápidas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-4 gap-4">
              <Link
                to="/generate"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Nueva Factura</p>
                  <p className="text-sm text-gray-500">Crear una nueva factura</p>
                </div>
              </Link>

              <Link
                to="/search"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Search className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Buscar Facturas</p>
                  <p className="text-sm text-gray-500">Encontrar facturas existentes</p>
                </div>
              </Link>

              <Link
                to="/analytics"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Ver Análisis</p>
                  <p className="text-sm text-gray-500">Estadísticas y reportes</p>
                </div>
              </Link>

              <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                <Calendar className="h-8 w-8 text-orange-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Próximos Vencimientos</p>
                  <p className="text-sm text-gray-500">{dashboardStats.facturasPendientes} facturas por vencer</p>
                </div>
              </div>
            </div>
          </div>
        </div>          
        </div>

      {/* Facturas recientes */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Facturas Recientes</h3>
            <Link to="/search" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todas
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(invoice.total)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.estado)}`}
                    >
                      {invoice.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
