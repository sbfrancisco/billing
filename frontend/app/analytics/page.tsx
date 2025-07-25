import { BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Facturas</h3>

        {/* Gráfico simulado */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Gráficos de análisis próximamente</p>
          <p className="text-sm text-gray-500 mt-2">
            Aquí se mostrarán estadísticas detalladas, gráficos de ingresos por mes, clientes más frecuentes, etc.
          </p>
        </div>

        {/* Métricas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">68%</p>
            <p className="text-sm text-gray-600">Facturas pagadas a tiempo</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">15.7k</p>
            <p className="text-sm text-gray-600">Promedio mensual</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">23</p>
            <p className="text-sm text-gray-600">Facturas este mes</p>
          </div>
        </div>
      </div>
    </div>
  )
}
