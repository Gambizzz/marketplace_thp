require 'rails_helper'

RSpec.feature "User Login", type: :feature do
  let!(:user) { FactoryBot.create(:user) }

  scenario "allows a user to log in" do
    visit new_user_session_path
    log_in_with_valid_data(user)

    expect(page).to have_text('Signed in successfully.')
  end

  scenario "shows errors when login fails" do
    visit new_user_session_path
    log_in_with_invalid_data

    expect(page).to have_text('Invalid Email or password.')
  end

  def log_in_with_valid_data(user)
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
  end

  def log_in_with_invalid_data
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'wrongpassword'
    click_button 'Log in'
  end
end




