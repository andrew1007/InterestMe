class Api::PinsController < ApplicationController
  helper_method :current_user

  def index
    pins = Pin.where.not(user_id: current_user.id).shuffle
    all_pins_count = pins.length
    pin_sets = (pins.length / 15)
    hash = {}
    i = 0
    not_complete = true
    while not_complete
      if ((i*14) + 14) > all_pins_count
        pin_set = pins[i*14 + 1..-1]
        not_complete = false
      else
        pin_set = pins[(i*14 + 2)...(i*14 + 14)]
      end
      pin_set_hash = pin_set.as_json
      j = 0
      while j < pin_set.length
        pin_set_hash[j]["username"] = pin_set[j].user.username
        pin_set_hash[j]["profile_picture"] = pin_set[j].user.profile_picture
        j += 1
      end
      hash[i] = pin_set_hash
      i += 1
    end
    hash[i + 1] = []
    @pins = hash
    @pin_set_count = hash.keys.length - 1
    render :index
  end

  def new
    @pin = Pin.new()
    user_id = current_user.id
    @boards = User.find(user_id).boards
    render '/api/boards/show'
  end

  def create
    @pin = Pin.new(pin_params)
    @pin.user_id = current_user.id
    @board = Board.find(params[:pin][:board_id].to_i)
    if @pin.save
      @pins = Pin.where(:board_id => @pin.board_id)
      render "/api/boards/show"
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end

  def edit
  end

  def update
    @pin = Pin.find(params[:id])
    if @pin.update_attributes(pin_params)
      render "/api/boards/show"
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end

  def show
    @board = Board.find(params[:id])
    @current_user = current_user
    @board_pins = @board.pins.order(:created_at)
    render :show
  end

  def destroy
    @pin = Pin.find(params[:id])
    if @pin
      @pin.destroy
      render :index
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end

  private

  def pin_params
    params.require(:pin).permit(:board_id, :image_url, :title, :body, :title)
  end
end
