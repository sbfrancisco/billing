class Addcontact < ActiveRecord::Migration[8.0]
  def change
    create_table :contacts do |t|
      t.string :emisor, null: false
      t.string :receptor, null: false
  end
 end
end
