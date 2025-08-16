require File.expand_path('../../config/enviroment', __FILE__)
class SalesRoutes < Sinatra::Base
  register AppConfig

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
