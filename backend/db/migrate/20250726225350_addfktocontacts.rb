class Addfktocontacts < ActiveRecord::Migration[8.0]
  def change
      add_index :clients, :documento, unique: true
      add_foreign_key :contacts, :clients, column: :receptor, primary_key: "documento"
      add_foreign_key :contacts, :clients, column: :emisor, primary_key: "documento"
  end
end
