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
    @board_pins = @board.pins.includes(:user).order(:updated_at).reverse
    board_json = @board_pins.as_json
    i = 0
    while i < board_json.length
      board_json[i]["username"] = @board_pins[i].user.username
      board_json[i]["profile_picture"] = @board_pins[i].user.profile_picture
      board_json[i]["board_name"] = @board_pins[i].board.name
      i += 1
    end
    @board_pins = board_json
    render :show
  end

  def destroy
    @board = Board.find(params[:id])
    board_pins = @board.pins
    if @board
      @board.destroy
      board_pins.each do |pins|
        pins.destroy
      end
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
