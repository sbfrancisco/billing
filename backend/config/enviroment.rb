require_relative '../helpers/app_helpers'

require_relative '../models/client'
require_relative '../models/service'
require_relative '../models/bill'
require_relative '../models/contact'
# add models here

module AppConfig
  def self.registered(app)
    app.enable :sessions
    app.set :database, adapter: 'sqlite3', database: 'db/wallet_development.sqlite3'
    app.set :frontend, false # if we take care of the frontend also with ruby -> true
    app.use Rack::MethodOverride

    if app.settings.frontend
    app.set :views, File.expand_path('../../views', __FILE__)
    app.set :public_folder, File.expand_path('../../public', __FILE__)
    end

    ActiveRecord::Base.logger = Logger.new(STDOUT) if app.development?

    app.configure :development do
      app.enable :logging
      logger = Logger.new(STDOUT)
      logger.level = Logger::DEBUG
      app.set :logger, logger

      app.register Sinatra::Reloader
      app.after_reload do
      logger.info 'Reloaded!!!'
      end
    end
    app.helpers AppHelpers
  end
end