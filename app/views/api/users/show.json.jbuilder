json.user do
  # json.extract! (@user, :id, :username, :description, :profile_picture)
  json.id @user['id']
  json.username @user['username']
  json.description @user['description']
  json.profile_picture @user['profile_picture']
  json.is_following @is_following
  json.owner @owner
  json.pins @pins
  json.boards @boards
  json.followed_by @followed_by
  json.following @following
end
