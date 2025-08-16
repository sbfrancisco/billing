class Addfkclientstobill < ActiveRecord::Migration[8.0]
   def change
    # Emisor de la factura → documento del cliente
    add_foreign_key :bills, :clients, column: :emisor, primary_key: :documento

    # Receptor de la factura → documento del cliente
    add_foreign_key :bills, :clients, column: :receptor, primary_key: :documento
  end
end
