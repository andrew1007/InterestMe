class Api::BoardsController < ApplicationController
  helper_method :current_user, :pin_sets

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
    @board = Board.find(params[:id]).as_json
    @current_user = current_user
    @board['owner'] = @current_user.id == @board['user_id']
    @board['username'] = @current_user.username
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
