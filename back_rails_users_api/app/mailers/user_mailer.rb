class UserMailer < Devise::Mailer
  default from: ENV['DEFAULT_FROM_EMAIL']
  layout 'mailer'
end
