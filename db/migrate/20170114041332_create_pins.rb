class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.integer :user_id, null:false
      t.integer :board_id, null:false
      t.string :title
      t.string :body
      t.string :image_url, null:false
      t.timestamps null: false
    end
    add_index :pins, :user_id
    add_index :pins, :board_id
  end
end
