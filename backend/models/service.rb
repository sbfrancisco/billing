class Service < ActiveRecord::Base
  has_many :sales
  has_one :client, foreign_key: :documento, primary_key: :transmitter
end