ruby '3.4.4'

source 'https://rubygems.org'

gem 'sinatra', '~> 4.1'
gem 'rackup'
gem 'puma', '~> 6.6'
gem 'sinatra-contrib'
gem 'sinatra-activerecord'
gem 'prawn'
gem 'sqlite3', '~> 2.0'
gem 'rake'
gem 'bcrypt'

group :test, :development do
  gem 'rspec'
  gem 'rack-test'

group :production do
  gem "pg"
end
end
