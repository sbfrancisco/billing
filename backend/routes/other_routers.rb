require File.expand_path('../../config/enviroment', __FILE__)
# every time you need to group certain routes, you can use this style, the import is to raise the app configuration
class OtherRoutes < Sinatra::Base
  register AppConfig
  # send json response with bills, clients, income

get '/data_transmitter' do
  content_type :json
  id = params['id']  
  transmitter = Client.find_by(documento: id)

  response_data = if transmitter
    {
      bills: transmitter.issued_bills.count,
      clients: transmitter.emisor_contacts.count,
      income: transmitter.issued_bills.where(status: 'success').sum(:total),
      pending: transmitter.issued_bills.where(status: 'pending').count
    }
  else
    { bills: 0, clients: 0, income: 0, pending: 0 }
  end

  json response_data
end

get '/fetch_bills' do 
  transmitter = params["transmitter"]
  client = Client.find_by(documento: transmitter)

  if client
    bills = client.issued_bills.map do |bill|
      bill.as_json.merge({
        client_name: Client.find_by(documento: bill.receptor).nombre,
        fecha: bill.created_at.strftime("%d/%m/%Y")
      })
    end

    json bills: bills
  else
    json bills: []
  end
end


end