class Api::FollowsController < ApplicationController


  def create
    @follow = Follow.create!(follow_params)
    render 'api/blank'
  end

  def destroy
    @follow = Follow.find_entry(follow_params)
    @follow.destroy
    render 'api/blank'
  end

  def follow_params
    params.require(:user).permit(:user_following_id, :user_followed_by_id)
  end

end
