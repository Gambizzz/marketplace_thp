Rails.application.routes.draw do
  resources :annonces, only: [:index, :create, :show, :update, :destroy], path: '/cree-annonces'

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords"
  }

  put "/users/password", to: "users/passwords#update"
  get "mes-annonces", to: "annonces#mes_annonces"
  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
end
