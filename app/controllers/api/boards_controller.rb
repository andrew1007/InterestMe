class Api::BoardsController < ApplicationController
  helper_method :current_user

  def new
    @board = Board.new()
  end

  def index
    user_id = current_user.id
  end

  def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id
    if @board.save
      @current_user = current_user
      @board_pins = @board.pins.reverse
      board_json = @board_pins.to_json
      i = 0
      while i < board_json.length
        i += 1
      end
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def edit
  end

  def update
    @board = Board.find(params[:id])
    if @board.update_attributes(board_params)
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def show
    @board = Board.find(params[:id])
    @current_user = current_user
    @board_pins = @board.pins.order(:updated_at)
    @board_pin_user_info = []
    @board_pins.each_with_index do |pin, idx|
      pin_owner = pin.user
      @board_pin_user_info << [pin_owner.username, pin_owner.profile_picture]
    end
    render :show
  end

  def destroy
    @board = Board.find(params[:id])
    if @board
      @board.destroy
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  private

  def board_params
    params.require(:board).permit(:name)
  end
end
