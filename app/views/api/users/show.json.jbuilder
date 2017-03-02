json.partial! "api/users/user",
{user: @user,
pins: @user.pins,
boards: @user_boards,
followed: @user.followed_by,
following: @user.following}
# samplePins: }
