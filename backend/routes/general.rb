require File.expand_path('../../config/enviroment', __FILE__)

class GeneralRoutes < Sinatra::Base
  register AppConfig

  get '/' do
  erb :example, layout: :'partial/header'
  end 
  
end