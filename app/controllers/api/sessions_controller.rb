class Api::SessionsController < ApplicationController
  def new
  end

  def create
    debugger
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      sign_in(@user)
      render 'api/session/show'
    else
      render(json:["invalid username/password combo"], status: 401)
    end
  end

  def destroy
    user = User.find_by(session_token: session[:session_token])
    if user
      sign_out
      render 'api/blank'
    else
      render(json:["uhh...."], status: 401)
    end
  end

  def show
    @user = current_user
    render 'api/session/show'
  end
end
