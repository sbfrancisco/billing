class Addfieldstoclients < ActiveRecord::Migration[8.0]
  def change
    add_column :clients, :email, :string
    add_column :clients, :password_digest, :string
    add_column :clients, :company, :string
  end
end
