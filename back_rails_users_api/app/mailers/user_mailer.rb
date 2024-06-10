class UserMailer < Devise::Mailer
  default from: ENV['MJ_DEFAULT_FROM']
  layout 'mailer'
end
