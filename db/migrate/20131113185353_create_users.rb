class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :last_name
      t.date :birth_date
      t.string :address
      t.string :phone_number

      t.timestamps
    end
  end
end