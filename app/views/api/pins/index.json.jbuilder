if @pin
else
  json.pins @pins
  json.user @user ? @user : nil
  json.pin_user_info @pin_user_info
end
