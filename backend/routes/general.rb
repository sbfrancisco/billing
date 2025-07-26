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
  clientes = Client.all
  clientes.to_json
  end

end