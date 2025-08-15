class Removecolumnofservices < ActiveRecord::Migration[8.0]
  def change
    remove_column :services, :cantidad, :string
    remove_column :services, :precio, :decimal
    add_column :sales, :price, :decimal, precision: 10, scale: 2, null: false, default: 0.0
  end
end
