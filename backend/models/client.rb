require 'bcrypt'

class Client < ActiveRecord::Base
  include BCrypt
  validates :password_digest, presence: true
  validates :documento, presence: true, uniqueness: true

  def password=(new_password)
    self.password_digest = Password.create(new_password)
  end

  # Autenticación manual
  def authenticate(password)
    Password.new(password_digest) == password
  end

  # Facturas donde este cliente es receptor
  has_many :received_bills,
           class_name: 'Bill',
           foreign_key: :receptor,
           primary_key: :documento

  # Facturas donde este cliente es emisor
  has_many :issued_bills,
           class_name: 'Bill',
           foreign_key: :emisor,
           primary_key: :documento

  has_many :services,
           foreign_key: :transmitter,
           primary_key: :documento

  # Contactos donde este cliente es emisor
  has_many :emisor_contacts,
           class_name: 'Contact',
           foreign_key: 'emisor',
           primary_key: 'documento'

  # Clientes receptores a los que este cliente les envió algo
  has_many :receptores,
           through: :emisor_contacts,
           source: :receptor_client

  # Contactos donde este cliente es receptor
  has_many :receptor_contacts,
           class_name: 'Contact',
           foreign_key: 'receptor',
           primary_key: 'documento'

  # Clientes emisores que enviaron algo a este cliente
  has_many :senders,
           through: :receptor_contacts,
           source: :emisor_client
end
