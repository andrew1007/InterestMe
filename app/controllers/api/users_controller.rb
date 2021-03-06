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
    user = User.find(params[:id])
    @user = user.data
    @boards = user.board_icons
    @pins = user.pins
    @followed_by = user.followed_by
    @following = user.following
    @owner = user.id == current_user.id
    @is_following = current_user.is_following?(user)
    render :show
  end

  def update
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
