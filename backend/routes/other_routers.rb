require File.expand_path('../../config/enviroment', __FILE__)
# every time you need to group certain routes, you can use this style, the import is to raise the app configuration
class OtherRoutes < Sinatra::Base
  register AppConfig
  # send json response with bills, clients, income

  get '/data_transmitter' do
    content_type :json
    data = JSON.parse(request.body.read)
    transmitter = Client.find_by(id: data['client_id'])
    data = {
      bills: transmitter.bills.count,
      clients: transmitter.contacts.count,
      income: transmitter.bills.where(status: 'success').sum(:total),
      pending: transmitter.bills.where(status: 'pending').count
    }
    json data
  end
end