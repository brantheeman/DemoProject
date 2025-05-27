module Api
  module V1
    class SessionsController < Devise::SessionsController
      respond_to :json

      # POST /api/v1/login
      def create
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        render json: {
          message: 'Logged in successfully',
          user: resource,
          token: request.env['warden-jwt_auth.token']
        }, status: :ok
      end

      # DELETE /api/v1/logout
      def destroy
        sign_out(current_user)
        render json: { message: "Logged out successfully" }, status: :ok
      end

      private

      def respond_to_on_destroy
        head :no_content
      end
    end
  end
end
