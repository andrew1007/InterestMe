class Api::SinglePinShowsController < ApplicationController

  helper_method :current_user

  def show
    @pin = Pin.find(params[:id])
    @current_user = current_user
    render :show
  end

end
