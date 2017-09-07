class Board < ActiveRecord::Base

  belongs_to :user

  def self.pins(board_id)
    all_pins = []
    pins = Pin.includes(:user).joins(:user).where("pins.board_id = ?", board_id)
    board_name = Board.find(board_id).name
    pins.each do |pin|
      user = pin.user
      pins_hash = pin.as_json
      pins_hash[:username] = user.username
      pins_hash[:profile_picture] = user.profile_picture
      pins_hash[:board_name] = board_name
      all_pins << pins_hash
    end
    all_pins
  end

  def self.owner(board_id)
    User.joins(:board).where('users.id = boards.user_id')
  end
end
