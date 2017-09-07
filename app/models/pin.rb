class Pin < ActiveRecord::Base

  belongs_to :board
  belongs_to :user

  def self.feed_for(user)
    all_pins = []
    pins = Pin.includes(:user).joins(:user).where.not({user_id: user.id}).shuffle
    pins.each do |pin|
      board = Board.find(pin.board_id)
      user = pin.user
      pins_hash = pin.as_json
      pins_hash[:username] = user.username
      pins_hash[:profile_picture] = user.profile_picture
      pins_hash[:board_name] = board.name
      all_pins << pins_hash
    end
    all_pins
  end

  def self.all_pins_except(user)
    pins = Pin.where.not(user_id: user.id).includes(:user).shuffle
    pinJSON = pins.as_json
    pinJSON.each do |pin|
      user = User.find(pin['user_id'])
      pin["username"] = user.username
      pin["profile_picture"] = user.profile_picture
      pin["board_name"] = Board.find(pin['board_id']).name
    end
    pins = pinJSON

    all_pins_count = pins.length
    hash = {}
    i = 0
    not_complete = true
    while not_complete
      if ((i*14 + 1) + 14) > all_pins_count
        if pins.length < 14
          last_pins = pins
        else
          last_pins = pins[(i*14 + 1)..-1]
        end
        hash[i] = last_pins
        not_complete = false
      else
        hash[i] = pins[(i*14 + 1)...(i*14 + 14)]
      end
      i += 1
    end
    [hash, hash.keys.length - 1]
  end



end
