class Api::FavoritesController < ApplicationController
  def create
    @favorite = Favorite.new(favorite_params)
    if @favorite.save
      render "api/favorites/show"
    else
      render json: @favorite.errors.full_messages, status: 422
    end
  end

  def show
    @favorite = User.find(params[:user_id]).favorites
    render :show
  end

  def destroy
    favorite = Favorite.find_by(favorite_destroy_params)
    if favorite
      favorite.destroy
      render :show
    else
      render json: favorite.errors.full_messages, status: 422
    end
  end

  def favorite_params
    params.require(:favorite).permit(:user_id, :pin_id)
  end

  def favorite_destroy_params
    {pin_id: favorite_params[:pin_id], user_id: current_user.id}
  end
end
