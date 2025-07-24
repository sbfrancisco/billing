import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, FileText, Eye, Clock, Shield, ArrowRight, Download } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Daniel Natale</h1>
                <p className="text-sm text-gray-600">Portal de Clientes</p>
              </div>
            </div>
            <div className="space-x-4">
              <Link to="/login" className="btn-outline">
                Ingresar
              </Link>
              <Link to="/register" className="btn-primary">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Accede a Tus Facturas y Servicios Eléctricos
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Portal exclusivo para clientes. Revisa el historial de servicios eléctricos, 
            descarga tus facturas y mantente al día con todos los trabajos realizados en tu propiedad.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="btn-primary btn-lg">
              Crear Cuenta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/login" className="btn-outline btn-lg">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Qué puedes hacer en tu portal?
            </h3>
            <p className="text-lg text-gray-600">
              Acceso completo a toda la información de tus servicios eléctricos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="card-header">
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold">Ver Facturas</h4>
              </div>
              <div className="card-content">
                <p className="text-gray-600">
                  Accede a todas tus facturas de servicios eléctricos organizadas por fecha.
                </p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-header">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold">Descargar PDF</h4>
              </div>
              <div className="card-content">
                <p className="text-gray-600">
                  Descarga tus facturas en formato PDF para tus registros personales.
                </p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-header">
                <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold">Historial de Servicios</h4>
              </div>
              <div className="card-content">
                <p className="text-gray-600">
                  Revisa todos los trabajos eléctricos realizados en tu propiedad.
                </p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-header">
                <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold">Estado de Pagos</h4>
              </div>
              <div className="card-content">
                <p className="text-gray-600">
                  Consulta el estado de tus pagos y facturas pendientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Información Segura y Privada
                </h3>
                <p className="text-gray-600 mb-4">
                  Tu información personal y el historial de servicios están completamente seguros. 
                  Solo tú puedes acceder a tus facturas y datos.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> Si eres cliente nuevo y no tienes cuenta, 
                    regístrate con el mismo email que proporcionaste para tus servicios eléctricos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">
            ¿Listo para acceder a tus facturas?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Crea tu cuenta en segundos y mantén el control de todos tus servicios eléctricos.
          </p>
          <Link
            to="/register"
            className="btn-lg bg-white text-blue-600 hover:bg-gray-100 font-semibold inline-flex items-center justify-center rounded-md transition-colors"
          >
            Crear Mi Cuenta
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
