require 'test_helper'

class Api::UsersControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

  describe 'POST #create' do
    context 'when password invalid' do
      it 'renders error JSON' do
        debugger
        payload = {user: {
          username: "andrew",
          password: "ds",
          description: ""
        }}
        expect(response.status).to eq(422)
        error = @user.errors.full_messages
        expect(error).to eq(["Password is too short (minimum is 6 caracters)"])
      end
    end

  end
end
