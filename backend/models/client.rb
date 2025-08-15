require 'bcrypt'

class Client < ActiveRecord::Base
  include BCrypt
  has_secure_password

  validates :password_digest, presence: true
  validates :documento, presence: true, uniqueness: true

  has_many :bills, foreign_key: :receptor, primary_key: :documento

  # Contactos donde este cliente es emisor
  has_many :emisor_contacts,
           class_name: 'Contact',
           foreign_key: 'emisor',
           primary_key: 'documento'

  # Clientes receptores a los que este cliente les envió algo
  has_many :clients,
           through: :emisor_contacts,
           source: :receptor_client

  # Contactos donde este cliente es receptor (opcional, por si querés lo inverso)
  has_many :receptor_contacts,
           class_name: 'Contact',
           foreign_key: 'receptor',
           primary_key: 'documento'

  # Clientes emisores que enviaron algo a este cliente
  has_many :senders,
           through: :receptor_contacts,
           source: :emisor_client

  def password=(new_password)
    self.password_digest = Password.create(new_password)
  end

  def authenticate(password)
    Password.new(password_digest) == password
  end
end
