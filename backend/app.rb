require 'sinatra'
require 'sinatra/cross_origin'
require 'json'

configure do
  enable :cross_origin
end

before do
  content_type :json
end

get '/api/users' do
  [{ id: 1, name: "Ana" }, { id: 2, name: "Juan" }].to_json
end