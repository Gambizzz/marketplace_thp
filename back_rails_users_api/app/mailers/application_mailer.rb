class ApplicationMailer < ActionMailer::Base
  default from: ENV['MJ_DEFAULT_FROM']
  layout "mailer"
end
