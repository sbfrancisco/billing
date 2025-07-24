import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Lock } from 'lucide-react';

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    
    // Aquí conectarías con tu backend Sinatra
    console.log('Login data:', loginData);
    
    // Simular llamada al backend
    setTimeout(() => {
      setIsLoading(false);
      alert('Acceso enviado al backend - redirigir a dashboard de facturas');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <div className="card-header space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Acceso de Cliente</h2>
          <p className="text-center text-gray-600">
            Ingresa para revisar tus facturas y servicios
          </p>
        </div>
        <div className="card-content">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="input-with-icon"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="label">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="input-with-icon"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ¿Primera vez aquí?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Crear cuenta
              </Link>
            </p>
            <Link to="/" className="text-sm text-gray-500 hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
