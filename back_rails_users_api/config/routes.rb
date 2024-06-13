Rails.application.routes.draw do
  resources :annonces, only: [:index, :create, :show, :update, :destroy], path: '/create-annonce'

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords"
  }

  
  get "user-annonces", to: "annonces#mes_annonces"
  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
end
