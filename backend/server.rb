require 'bundler/setup'
require 'sinatra/base'
require 'sqlite3'
require 'sinatra/reloader' if Sinatra::Base.environment == :development
require 'sinatra/activerecord'
require 'logger'
require 'net/http'
require 'sinatra'
require 'sinatra/json'
require 'sinatra/namespace'
require 'prawn'
require_relative 'config/enviroment'
# add here path of custom routes
require_relative 'routes/general'
class App < Sinatra::Application
  register AppConfig
  use GeneralRoutes
end