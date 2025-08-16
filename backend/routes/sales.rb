class SalesRoutes < Sinatra::Base
  register AppConfig

  get '/services' do
    content_type :json  
    transmitter = params['transmitter']
    if transmitter  
      services = Service.where(transmitter: transmitter, persistent: true)
      status 200
      json services: services
    else    
      status 400
      json message: "Transmitter no proporcionado"
    end
  end

  post '/save_service' do
    content_type :json
    data = JSON.parse(request.body.read)
    service_data = data['service']
    service = Service.new(
      nombre: service_data['nombre'],
      price_base: service_data['price_base'],
      transmitter: service_data['transmitter'],
      isService: service_data['isService'],
      persistent: true
    )

    if service.save
      status 201
      json message: "Servicio guardado correctamente", service: service
    else
      status 500
      json message: "Error al guardar el servicio"
    end
  end

  put '/update_service' do
    content_type :json
    service = Service.find_by(id: params[:id])
    if service
      data = JSON.parse(request.body.read)
        service_data = data['service']
      if service.update(
        nombre: service_data['nombre'],
        price_base: service_data['price_base'],
        isService: service_data['isService']
      )
        status 200
        json message: "Servicio actualizado correctamente", service: service
      else
        status 500
        json message: "Error al actualizar el servicio"
      end
    else
      status 404
      json message: "Servicio no encontrado"
    end
  end

  delete '/delete_service' do
    content_type :json
    service = Service.find_by(id: params[:id])
    if service
      if service.destroy
        status 200
        json message: "Servicio eliminado correctamente"
      else
        status 500
        json message: "Error al eliminar el servicio"
      end
    else
      status 404
      json message: "Servicio no encontrado"
    end
  end

  get '/last_voucher_number' do
  content_type :json
  last_bill = Bill.order(id: :desc).first.id
  if last_bill
    status 200
    json last_voucher_number: last_bill
  else
    status 200
    json last_voucher_number: 0
  end
  end
post '/save_bill' do
  content_type :json
  data = JSON.parse(request.body.read)

  sales_data = data["sales"]
  total = sales_data.sum { |sale| sale["price"].to_f * sale["quantity"].to_i }

  bill = Bill.new(
    emisor: data["emisor"],
    receptor: data["receptor"],
    total: total,
    status: "pending"
  )

  if bill.save
    # crear las ventas asociadas
    sales_data.each do |sale|
      service = if sale["id"] == 'null'
                  Service.create(
                    nombre: sale["nombre"],
                    transmitter: data["emisor"],
                    isService: sale["servicio"],
                    price_base: sale["price"]
                  )
                else
                  Service.find_by(id: sale["id"])
                end

      Sale.create(
        price: sale["price"],
        quantity: sale["quantity"],
        service_id: service&.id, # queda nil si no existe
        bill_id: bill.id
      )
    end

    status 200
    json bill: bill
  else
    status 400
    json message: "La factura no pudo ser guardada"
  end
end



end
