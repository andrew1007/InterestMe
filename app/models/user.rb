class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true

  attr_reader :password

  after_initialize :ensure_session_token

  has_and_belongs_to_many :users_following

  has_many :boards
  has_many :pins
  has_many :favorites

  def data
    keys = ['id', 'username', 'description', 'profile_picture']
    User.extract_by_keys(self.as_json, keys)
  end

  def is_following?(user)
    follow_ids = user.followed_by.map {|follow| follow['id']}
    follow_ids.include?(self.id)
  end

  def boards
    boards = Board.where({user_id: self.id})
    boards.each do |board|
      board[:sample_pins] = Board.pins[0..2]
    end
  end

  def followed_by
    followers = Follow.where({user_followed_by_id: self.id})
    keys = ['id', 'username', 'profile_picture']
    users = followers.map {|el| User.find(el.user_followed_by_id)}
    follows_arr = []
    users.each do |user|
      follows_arr << User.extract_by_keys(user.as_json, keys)
    end
    follows_arr
  end

  def following
    followers = Follow.where({user_following_id: self.id})
    keys = ['id', 'username', 'profile_picture']
    users = followers.map {|el| User.find(el.user_following_id)}
    follows_arr = []
    users.each do |user|
      follows_arr << User.extract_by_keys(user.as_json, keys)
    end
    follows_arr
  end

  def self.extract_by_keys(hash, keys)
    hash.select{|k, v| keys.include?(k)}
  end

  def board_icons
    all_boards = []
    boards = Board.where({user_id: self.id})
    boards.each do |board|
      board_hash = {id: board.id, name: board.name}
      board_hash[:sample_images] = User.board_sample_images(board)
      all_boards << board_hash
    end
    all_boards
  end

  def self.board_sample_images(board)
    pin_images = Pin.where({board_id: board.id})[0..2].as_json
    pin_images.map {|pic| pic['image_url']}
  end

  def pins
    all_pins = []
    pins = Pin.where({user_id: self.id})
    pins.each do |pin|
      board = Board.find(pin.board_id)
      user = User.find(self.id)
      pins_hash = pin.as_json
      pins_hash[:username] = user.username
      pins_hash[:profile_picture] = user.profile_picture
      pins_hash[:board_name] = board.name
      all_pins << pins_hash
    end
    all_pins
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
