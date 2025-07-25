require File.expand_path('../../config/enviroment', __FILE__)
# every time you need to group certain routes, you can use this style, the import is to raise the app configuration
class TemplateRoutes < Sinatra::Base
  register AppConfig
  # your endpoints here
end