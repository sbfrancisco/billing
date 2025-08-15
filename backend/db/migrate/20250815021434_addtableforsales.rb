class Addtableforsales < ActiveRecord::Migration[8.0]
  def change
    create_table :sales do |t|
      t.references :service, null: false, foreign_key: true
      t.references :bill, null: false, foreign_key: true
      t.integer :quantity, null: false, default: 1
    end
  end
end
