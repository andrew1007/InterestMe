class Addindex < ActiveRecord::Migration
  def change
    add_index :boards, :user_id
  end
end
