json.pin do
  json.id @pin.id
  json.title @pin.title
  json.body @pin.body
  json.board_name @pin.board.name
  json.board_id @pin.board.id
  json.author @pin.user.username
  json.author_id @pin.user.id
  json.authorProfilePicture @pin.user.profile_picture
  json.image_url @pin.image_url
  json.owner @pin.user_id == (@current_user ? @current_user.id : nil)
end
