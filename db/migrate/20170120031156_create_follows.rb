class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :user_following_id
      t.integer :user_followed_by_id
      t.timestamps null: false
    end
    add_index :follows, :user_following_id
    add_index :follows, :user_followed_by_id
  end
end
