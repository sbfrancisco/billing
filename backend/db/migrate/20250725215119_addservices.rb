class Addservices < ActiveRecord::Migration[8.0]
  def change
    create_table :services do |t|
      t.string :nombre, null: false
      t.integer :cantidad, null: false
      t.decimal :precio, precision: 10, scale: 2, null: false
    end
  end
end