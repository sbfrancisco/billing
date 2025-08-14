# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_14_223700) do
  create_table "bills", force: :cascade do |t|
    t.string "emisor", null: false
    t.string "receptor", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "total", precision: 10, scale: 2, default: "0.0", null: false
    t.string "status", default: "pending"
  end

  create_table "clients", force: :cascade do |t|
    t.string "nombre", null: false
    t.string "telefono", null: false
    t.string "direccion", null: false
    t.string "documento", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.string "password_digest"
    t.string "company"
    t.index ["documento"], name: "index_clients_on_documento", unique: true
  end

  create_table "contacts", force: :cascade do |t|
    t.string "emisor", null: false
    t.string "receptor", null: false
  end

  create_table "services", force: :cascade do |t|
    t.string "nombre", null: false
    t.integer "cantidad", null: false
    t.decimal "precio", precision: 10, scale: 2, null: false
    t.string "owner"
  end

  add_foreign_key "bills", "clients", column: "id"
  add_foreign_key "contacts", "clients", column: "emisor", primary_key: "documento"
  add_foreign_key "contacts", "clients", column: "receptor", primary_key: "documento"
  add_foreign_key "services", "bills", column: "id"
end
