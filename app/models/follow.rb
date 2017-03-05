class Follow < ActiveRecord::Base

belongs_to :user_following,
class_name: :User,
foreign_key: :user_following_id,
primary_key: :id

belongs_to :user_followed_by,
class_name: :User,
foreign_key: :user_followed_by_id,
primary_key: :id


end
