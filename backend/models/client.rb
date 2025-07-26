class Client < ActiveRecord::Base
  has_many :bills, foreign_key: :receptor, primary_key: :documento
  validates :documento, presence: true, uniqueness: true
  validates :owner, presence: true
  validates :documento, uniqueness: { scope: :owner, message: "ya está registrado este cliente" }
end