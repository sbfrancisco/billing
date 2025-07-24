require 'sinatra'
require 'sinatra/cross_origin'
require 'json'

configure do
  enable :cross_origin
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  content_type :json
end

options '*' do
  200
end

get '/api/users' do
  [
    { id: 1, name: "Ana" },
    { id: 2, name: "Juan" }
  ].to_json
end