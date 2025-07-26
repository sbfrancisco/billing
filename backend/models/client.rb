class Client < ActiveRecord::Base
  # your relations here
  validates :documento, presence: true, uniqueness: true
end