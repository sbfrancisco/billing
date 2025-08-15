require File.expand_path('../../config/enviroment', __FILE__)

class GeneralRoutes < Sinatra::Base
  register AppConfig

  get '/' do
  erb :example, layout: :'partial/header'
  end 

  post '/save_client' do
  content_type :json
  data = JSON.parse(request.body.read)
  client = Client.new(
    nombre: data['nombre'],
    telefono: data['telefono'],
    direccion: data['direccion'],
    documento: data['documento'],
    password_digest: "a",
    company: "a")

  if client.save
      Contact.create(
      emisor: data['emisor'],
      receptor: data['documento']
    )
    status 201
    json message: "Cliente guardado correctamente", client: client
  else
    status 500
    json message: "Error al guardar, ya hay un cliente registrado con ese documento"
    end
  end

post '/update_user' do
  content_type :json
  data = JSON.parse(request.body.read)

  client = Client.find_by(documento: data['documento']) 

  unless client && data['isAuthenticated']
    status 400
    return json message: "Cliente no encontrado o no autorizado"
  end

  if client.update(
    nombre: data['name'],
    telefono: data['telefono'],
    direccion: data['direccion'],
    company: data['company']
  )
    status 200
    json message: "Cliente actualizado correctamente", client: client
  else
    status 500
    json message: "Error al actualizar el cliente, verifique los datos" 
  end
end


get '/clients' do
  content_type :json
  contactos = Contact.where(emisor: params['id'])
  clientes = contactos.map { |c| Client.find_by(documento: c.receptor) }
  json clientes
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