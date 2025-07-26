class Addbill < ActiveRecord::Migration[8.0]
  def change
    create_table :bills do |t|
      t.string :emisor, null: false
      t.string :receptor, null: false  # Esto apunta a clients.documento
      t.timestamps
    end
  end
end
