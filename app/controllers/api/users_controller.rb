class Api::UsersController < ApplicationController
helper_method :current_user

  def create
    @user = User.new(user_params)
    @user.profile_picture = "https://res.cloudinary.com/andoo/image/upload/c_crop,h_175,r_100,w_173,x_74,y_0/v1484764852/vonrulf1kpsuhqlxobir.png"
    @user.description = ""
    if @user.save
      sign_in(@user)
      render "api/session/new"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    user_pins = @user.pins.order(:updated_at).reverse

    pin_batches = pin_sets(user_pins)
    @pins = pin_batches[0]
    @pin_set_count = pin_batches[1]

    @followed_by = @user.followed_by
    @following = @user.following
    @owner = @user.id == current_user.id
    follow_ids = @user.followed_by.map { |follow| follow.id}
    @isFollowing = follow_ids.include?(current_user.id)
    boards = @user.boards
    board_JSON = boards.as_json
    boards.each_with_index do |board, idx|
      board_pins = []
      board.pins[0..2].each do |pin|
        board_pins << pin.image_url
      end
      board_JSON[idx]["samplePins"] = board_pins
    end
    @boards = board_JSON
    render :show
  end

  def update
    @curr_user = current_user
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :description, :profile_picture)
  end

  def update_params
    params.permit(:id, :email, :profile_picture)
  end
end
