json.user do
  json.extract!(@user, :id, :username, :description, :profile_picture)
  json.is_following @is_following
  json.owner @owner
  json.pins @pins
  json.boards @boards
  json.extract!(@followed_by, :id, :username)
  json.extract!(@following, :id, :username)
end
