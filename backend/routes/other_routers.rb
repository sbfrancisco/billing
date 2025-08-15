require File.expand_path('../../config/enviroment', __FILE__)
# every time you need to group certain routes, you can use this style, the import is to raise the app configuration
class OtherRoutes < Sinatra::Base
  register AppConfig
  # send json response with bills, clients, income

  post '/data_transmitter' do
    content_type :json
    data = JSON.parse(request.body.read)
    puts "Datos recibidos:", data
    transmitter = Client.find_by(documento: data['documento'])
     response_data = if transmitter
      {
        bills: transmitter.bills.count,
        clients: transmitter.clients.count,
        income: transmitter.bills.where(status: 'success').sum(:total),
        pending: transmitter.bills.where(status: 'pending').count
      }
    else
      { bills: 0, clients: 0, income: 0, pending: 0 }
    end
    json response_data
  end
end