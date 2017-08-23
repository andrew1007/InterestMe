json.id @board.id
json.name @board.name
json.current_user (@current_user ? @current_user.id : nil)
json.owner @board.user_id == (@current_user ? @current_user.id : nil)
json.author @board.user.username
json.profile_picture @board.user.profile_picture
json.owner_id @board.user.id
json.pins @pins
