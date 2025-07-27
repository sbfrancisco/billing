require File.expand_path('../../config/enviroment', __FILE__)

class GeneralRoutes < Sinatra::Base
  register AppConfig
  before do
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  end

options '*' do
  200
end

  get '/' do
  erb :example, layout: :'partial/header'
  end 

  post '/save_service' do
  content_type :json
  data = JSON.parse(request.body.read)
  service = Service.new(
    nombre: data['nombre'],
    cantidad: data['cantidad'],
    precio: data['precio']
  )

  if service.save
    status 201
    json message: "Servicio guardado correctamente", service: service
  else
    status 500
    json message: "Error al guardar el servicio"
  end
end

  post '/save_client' do
  content_type :json
  data = JSON.parse(request.body.read)
  client = Client.new(
    nombre: data['nombre'],
    telefono: data['telefono'],
    direccion: data['direccion'],
    documento: data['documento']
  )

  if client.save
    status 201
    json message: "Cliente guardado correctamente", client: client
  else
    status 500
    json message: "Error al guardar, ya hay un cliente registrado con ese documento"
    end
  end

  get '/clients' do
  content_type :json
  clientes = Client.all.find_by()
  clientes.to_json
  end

  post '/register' do
  content_type :json
  data = JSON.parse(request.body.read)
  client = Client.new(
    nombre: data['name'],
    telefono: data['phone'],
    direccion: data['direccion'],
    documento: data['documento'],
    telefono: data['telefono'],
    company: data['company'],
    email: data['email'],
    password: data['password'])
  if client.save
    status 201
    json message: "Cliente registrado correctamente", client: client
  else
    status 500
    json message: "Error al registrar el cliente, verifique los datos" 
  end
end

  post '/login' do
  content_type :json
  data = JSON.parse(request.body.read)
  client = Client.find_by(email: data['email'])

  if client && client.authenticate(data['password'])
    status 200
    json message: "Login exitoso", client: client
  else
    status 401
    json message: "Credenciales inválidas"
  end
end
end