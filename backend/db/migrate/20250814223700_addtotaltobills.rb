class Addtotaltobills < ActiveRecord::Migration[8.0]
  def change
    add_column :bills, :total, :decimal, precision: 10, scale: 2, null: false, default: 0.0
    add_column :bills, :status, :string, default: 'pending'
  end
end
