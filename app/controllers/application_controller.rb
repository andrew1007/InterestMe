class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  helper_method :current_user, :signed_in?, :pin_sets

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = @current_user.reset_token!
  end

  def sign_out
    current_user.reset_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_signed_in
    render json: {base: ['invalid credentials']}, status: 401 if !current_user
  end
end
