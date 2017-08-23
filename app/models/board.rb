class Board < ActiveRecord::Base

  belongs_to :user

  def self.pins(board_id)
    all_pins = []
    pins = Pin.includes(:user).joins(:user).where("pins.board_id = ?", board_id)
    pins.each do |pin|
      user = pin.user
      pins_hash = pin.as_json
      pins_hash[:username] = user.username
      pins_hash[:profile_picture] = user.profile_picture
      all_pins << pins_hash
    end
    all_pins
  end

  def self.owner(board_id)
    User.joins(:board).where('users.id = boards.user_id')
  end
end
