require 'bcrypt'
class Client < ActiveRecord::Base
  include BCrypt
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true

  has_many :bills, foreign_key: :receptor, primary_key: :documento
  validates :documento, presence: true, uniqueness: true

  def password=(new_password)
    self.password_digest = Password.create(new_password)
  end


  def authenticate(password)
    Password.new(password_digest) == password
  end

end