Rails.application.routes.draw do
  devise_for :users,
             defaults: { format: :json },
             controllers: {
               sessions: 'api/v1/sessions',
               registrations: 'api/v1/registrations'
             }

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post 'login', to: 'sessions#create'
        delete 'logout', to: 'sessions#destroy'
        post 'signup', to: 'registrations#create'
      end

      get 'me', to: 'users#show'

      namespace :admin do
        resources :users, only: %i[index show update destroy]
        resources :tasks, only: %i[index destroy]
      end

      # Main user-accessible features
      resources :tasks
    end
  end
end
