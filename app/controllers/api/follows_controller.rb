class Api::FollowsController < ApplicationController


  def create
    @follow = Follow.create!(follow_params)
    render 'api/users/show'
  end

  def destroy
    @follow = Follow.where(:user_followed_by_id => (params[:user][:user_following_id]).to_i,
    :user_following_id => (params[:user][:user_followed_by_id]).to_i)
    @follow.each {|follow| follow.destroy}

    render 'api/users/show'
  end

  def follow_params
    params.require(:user).permit(:user_following_id, :user_followed_by_id)
  end

end
