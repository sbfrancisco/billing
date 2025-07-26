require_relative 'client'
class Bill < ActiveRecord::Base
  belongs_to :client, foreign_key: :receptor, primary_key: :documento, optional: true

  validate :cliente_existente_con_owner

  private

  def cliente_existente_con_owner
    unless Client.exists?(documento: receptor, owner: emisor)
      errors.add(:base, "No existe un cliente con ese documento y dueño")
    end
  end
end
