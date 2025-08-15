class Addownertoservice < ActiveRecord::Migration[8.0]
  def change
    add_column :services, :isService, :boolean, default: true
    add_column :services, :price_base, :decimal, precision: 10, scale: 2, null: false, default: 0.0
  end
end
