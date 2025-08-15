class Addfkservicetoclient < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :services, :clients, column: :transmitter, primary_key: :documento
    add_index :services, :transmitter, name: 'index_services_on_transmitter'
  end
end
