if @pin
else
  json.pins @pins
  json.user @user ? @user : nil
  json.pinSetCount @pin_set_count
end
