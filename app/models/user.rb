class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_and_belongs_to_many :users_following

  has_many :boards
  has_many :pins
  has_many :favorites

  has_many :followers_join,
  class_name: "Follow",
  foreign_key: :user_following_id,
  primary_key: :id

  has_many :following_join,
  class_name: "Follow",
  foreign_key: :user_followed_by_id,
  primary_key: :id

  has_many :followed_by,
  through: :followers_join,
  source: :user_followed_by

  has_many :following,
  through: :following_join,
  source: :user_following

  def is_following?(user)
    follow_ids = user.followed_by.map {|follow| follow.id}
    follow_ids.include?(self.id)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
