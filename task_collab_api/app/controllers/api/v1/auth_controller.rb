class Api::V1::AuthController < ApplicationController
  before_action :authenticate_user!

    def test
        render json: { message: "Hello, #{current_user.email}" }
    end

  # POST /signup
  def signup
    user = User.new(user_params)
    if user.save
      render json: { message: 'User created successfully.' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /login
  def login
    user = User.find_for_database_authentication(email: params[:email])
    if user&.valid_password?(params[:password])
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
      render json: { token: token, user: { id: user.id, email: user.email, role: user.role } }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # DELETE /logout
  def logout
    # With `Null` strategy, token can't be revoked.
    render json: { message: 'Logged out successfully (stateless).' }
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :role)
  end
end
