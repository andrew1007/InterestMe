require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:username) }
  it { should validate_length_of(:password).is_at_least(6)}
  it { should have_many(:boards) }
  it { should have_many(:pins) }
  it { should have_many(:favorites) }
  it { should have_many(:followed_by) }
  it { should have_many(:following) }

end
