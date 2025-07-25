class Addclient < ActiveRecord::Migration[8.0]
  def change
    create_table :clients do |t|
      t.string :nombre, null: false
      t.string :telefono, null: false
      t.string :direccion, null: false
      t.string :documento, null: false
      t.timestamps
    end
  end
end