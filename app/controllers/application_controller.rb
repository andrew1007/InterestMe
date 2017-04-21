class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  helper_method :current_user, :signed_in?, :pin_sets

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = @current_user.reset_token!
  end

  def sign_out
    current_user.reset_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_signed_in
    render json: {base: ['invalid credentials']}, status: 401 if !current_user
  end

  def pin_sets(pins)
    all_pins_count = pins.length
    pin_sets = (pins.length / 15)
    hash = {}
    i = 0
    not_complete = true
    while not_complete
      if ((i*14 + 1) + 14) > all_pins_count
        pin_set = pins[i*14 + 1..-1]
        not_complete = false
      else
        pin_set = pins[(i*14 + 1)...(i*14 + 14)]
      end
      pin_set_hash = pin_set.as_json
      j = 0
      while j < pin_set.length
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
