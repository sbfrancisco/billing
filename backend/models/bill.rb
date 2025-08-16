class Bill < ActiveRecord::Base
  belongs_to :emisor_client, class_name: "Client", foreign_key: :emisor, primary_key: :documento, optional: true
  belongs_to :receptor_client, class_name: "Client", foreign_key: :receptor, primary_key: :documento, optional: true

  has_many :sales

  validate :cliente_existente_con_owner

  private

  def cliente_existente_con_owner
    unless Contact.exists?(receptor: receptor, emisor: emisor)
      errors.add(:base, "No existe un cliente con ese documento y dueño")
    end
  end
end
