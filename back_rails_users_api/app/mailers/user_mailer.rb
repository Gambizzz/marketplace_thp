class UserMailer < ApplicationMailer
  default from: ENV['MAILJET_DEFAULT_FROM']

  def reset_password_email(user)
    @user = user
    @token = @user.send(:set_reset_password_token)
    @url  = edit_password_url(@token)
    mail(to: @user.email, subject: 'Réinitialisation de votre mot de passe')
  end

  private

  def edit_password_url(token)
    "http://localhost:3000/reset-password/#{token}"
  end
end
