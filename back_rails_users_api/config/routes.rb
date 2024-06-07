Rails.application.routes.draw do
  root "home#index"
  resources :annonces, only: [:index, :create], path: '/mes-annonces'
  
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords" 
  }

  

  get "up" => "rails/health#show", as: :rails_health_check
end
