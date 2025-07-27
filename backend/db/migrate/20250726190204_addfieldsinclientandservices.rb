class Addfieldsinclientandservices < ActiveRecord::Migration[8.0]
  def change
    add_column :services, :owner, :string
  end
end

