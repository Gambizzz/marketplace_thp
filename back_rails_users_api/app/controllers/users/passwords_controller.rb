# app/controllers/users/passwords_controller.rb
class Users::PasswordsController < Devise::PasswordsController
  respond_to :json

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    if successfully_sent?(resource)
      render json: { message: 'Un email de réinitialisation de mot de passe a été envoyé.' }, status: :ok
    else
      render json: { error: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    if resource.errors.empty?
      render json: { message: 'Le mot de passe a été réinitialisé avec succès.' }, status: :ok
    else
      render json: { error: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def after_sending_reset_password_instructions_path_for(resource_name)
    # Customize the reset password URL with the frontend URL
    "http://localhost:3000/reset-password/#{resource.send(:set_reset_password_token)}"
  end
end



