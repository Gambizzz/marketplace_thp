class Users::PasswordsController < Devise::PasswordsController
  respond_to :json

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    if successfully_sent?(resource)
      @user = resource
      render json: { message: 'Un email de réinitialisation de mot de passe a été envoyé.' }, status: :ok
    else
      render json: { error: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def resource_params
    params.require(:user).permit(:email)
  end
end





