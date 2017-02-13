if @follow
else
  json.user @user
  json.pins @user_pins
  json.boards @user_boards
  json.followed @followed_by
  json.following @following
  json.currentUserId @curr_user.id ? @curr_user.id : nil
  json.isFollowing @isFollowing
  json.samplePins @sample_pins
end
