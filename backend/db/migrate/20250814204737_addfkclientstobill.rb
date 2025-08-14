class Addfkclientstobill < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :bills, :clients, column: :id, primary_key: :id
  end
end
