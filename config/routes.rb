Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy, :new, :show]
    resources :boards, only: [:create, :show, :update, :destroy]
    resources :pins, only: [:index, :create, :show, :update, :destroy]
    resources :profiles, only: [:show, :update]
    resources :single_pin_shows, only: [:show]
    resources :follows, only: [:create, :destroy]
  end
end
