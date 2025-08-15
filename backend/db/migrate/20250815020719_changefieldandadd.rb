class Changefieldandadd < ActiveRecord::Migration[8.0]
  def change
    rename_column :services, :owner, :transmitter
    add_column :services, :persistent, :boolean, default: false
  end
end