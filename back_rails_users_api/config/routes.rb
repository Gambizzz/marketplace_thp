Rails.application.routes.draw do
resources :annonces, only: [:index, :create], path: '/mes-annonces'
  # devise_for :users, defaults: { format: :json }

  root "home#index"

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords" 
  }

  get "up" => "rails/health#show", as: :rails_health_check
end
