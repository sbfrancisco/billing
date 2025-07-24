import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Lock, User, Phone } from 'lucide-react';

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const registerData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      password: formData.get('password')
    };
    
    // Aquí conectarías con tu backend Sinatra
    console.log('Register data:', registerData);
    
    // Simular llamada al backend
    setTimeout(() => {
      setIsLoading(false);
      alert('Registro enviado al backend - cliente registrado');
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
          <h2 className="text-2xl font-bold text-center">Registro de Cliente</h2>
          <p className="text-center text-gray-600">
            Crea tu cuenta para acceder a tus facturas
          </p>
        </div>
        <div className="card-content">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="label">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Juan Pérez"
                  className="input-with-icon"
                  required
                />
              </div>
            </div>
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
              <label htmlFor="phone" className="label">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  className="input-with-icon"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="label">Dirección</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Calle 123, Ciudad"
                className="input"
                required
              />
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
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Inicia sesión
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

export default Register;
