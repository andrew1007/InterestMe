class Board < ActiveRecord::Base

  belongs_to :user

  def pins(current_user = nil)
    pins = Pin.where(board_id: self.id).order(:updated_at).reverse
    return pins if !current_user
    favorited_id_hash = {}
    if current_user
      current_user.favorites.each do |pin|
        favorited_id_hash[pin.id] = true
      end
    end
    board_owner = self.user
    pinJSON = pins.as_json
    if current_user
      pinJSON.each_with_index do |pin, idx|
        pin["favorited"] = favorited_id_hash[pins[idx].id] ? true : false
      end
    end
    username = board_owner.username
    profile_picture = board_owner.profile_picture
    board_name = self.name
    pinJSON.each do |pin|
      pin["username"] = username
      pin["profile_picture"] = profile_picture
      pin["board_name"] = board_name
    end
    as_batches(pinJSON)
  end

  def as_batches(pins)
    all_pins_count = pins.length
    hash = {}
    i = 0
    not_complete = true
    while not_complete
      if ((i*14 + 1) + 14) > all_pins_count
        hash[i] = pins[(i*14 + 1)..-1]
        not_complete = false
      else
        hash[i] = pins[(i*14)...(i*14 + 14)]
      end
      i += 1
    end
    [hash, hash.keys.length - 1]
  end
end
