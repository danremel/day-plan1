Rails.application.routes.draw do
  namespace :api do
    resources :days do
      resources :tasks
    end
  end
end
