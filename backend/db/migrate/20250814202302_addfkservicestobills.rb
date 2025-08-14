class Addfkservicestobills < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :services, :bills, column: :id, primary_key: :id
  end
end
