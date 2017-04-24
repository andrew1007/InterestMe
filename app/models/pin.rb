class Pin < ActiveRecord::Base

  belongs_to :board
  belongs_to :user

  def self.all_pins_except(user)
    pins = Pin.where.not(user_id: user.id).includes(:user).shuffle
    all_pins_count = pins.length
    pin_sets = pins.length / 15
    hash = {}
    i = 0
    not_complete = true
    while not_complete
      if ((i*14 + 1) + 14) > all_pins_count
        if pins.length < 14
          pin_set = pins
        else
          pin_set = pins[i*14 + 1..-1]
        end
        not_complete = false
      else
        pin_set = pins[(i*14)...(i*14 + 14)]
      end
      pin_set_hash = pin_set.as_json
      j = 0
      while j < pin_sets
        pin_user = pin_set[j].user
        pin_set_hash[j]["username"] = pin_user.username
        pin_set_hash[j]["profile_picture"] = pin_user.profile_picture
        pin_set_hash[j]["board_name"] = pin_set[j].board.name
        j += 1
      end
      hash[i] = pin_set_hash
      i += 1
    end
    [hash, hash.keys.length - 1]
  end



end
