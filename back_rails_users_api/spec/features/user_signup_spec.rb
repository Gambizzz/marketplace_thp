require 'rails_helper'

RSpec.feature "User Signup", type: :feature do
  scenario "allows a user to sign up" do
    visit new_user_registration_path
    sign_up_with_valid_data

    expect(page).to have_text('Welcome! You have signed up successfully.')
  end

  scenario "shows errors when user signup fails" do
    visit new_user_registration_path
    sign_up_with_invalid_data

    expect(page).to have_text("Password confirmation doesn't match Password")
  end

  def sign_up_with_valid_data
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_button 'Sign up'
  end

  def sign_up_with_invalid_data
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'wrongpassword'
    click_button 'Sign up'
  end
end



