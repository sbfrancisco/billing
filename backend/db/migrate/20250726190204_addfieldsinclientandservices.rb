class Addfieldsinclientandservices < ActiveRecord::Migration[8.0]
  def change
    add_column :clients, :owner, :string
    add_column :services, :owner, :string
     add_index :clients, [:documento, :tipo_documento], unique: true
  end
end

