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

  def user_board
    board_JSON = self.boards.as_json
    board_JSON.each_with_index do |board, idx|
      board_JSON[idx]["samplePins"] = sample_images(board)
    end
    board_JSON
  end

  def sample_images(board)
    images = []
    board = Board.find(board["id"])
    board.pins[0..2].each { |pin| images << pin.image_url}
    images
  end

  def pin_batches
    pins = self.pins.order(:updated_at).reverse
    all_pins_count = pins.length
    pin_sets = pins.length / 15
    hash = {}
    i = 0
    not_complete = true
    while not_complete
      if ((i*14 + 1) + 14) > all_pins_count
        if pins.length < 14
          pin_set = pins
        else
          pin_set = pins[i*14 + 1..-1]
        end
        not_complete = false
      else
        pin_set = pins[(i*14)...(i*14 + 14)]
      end
      pin_set_hash = pin_set.as_json
      j = 0
      while j < pin_sets
        pin_user = pin_set[j].user
        pin_set_hash[j]["username"] = pin_user.username
        pin_set_hash[j]["profile_picture"] = pin_user.profile_picture
        pin_set_hash[j]["board_name"] = pin_set[j].board.name
        j += 1
      end
      hash[i] = pin_set_hash
      i += 1
    end
    [hash, hash.keys.length - 1]
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
