require 'rails_helper'

RSpec.describe Api::UserController, type: :controller do
  describe "POST #create" do
    post :create, {hash table of stuff params}
    expect(response).to have_http_status(200)
  end
end
