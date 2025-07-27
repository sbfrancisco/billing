class Contact < ActiveRecord::Base
  validates :emisor, presence: true
  validates :receptor, presence: true

  belongs_to :emisor_client, class_name: 'Client', foreign_key: 'emisor', primary_key: 'documento'
  belongs_to :receptor_client, class_name: 'Client', foreign_key: 'receptor', primary_key: 'documento'
end