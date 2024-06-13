require 'rails_helper'

RSpec.feature "Create Annonce", type: :feature do
  let(:user) { FactoryBot.create(:user) }

  scenario "allows a user to create an annonce" do
    user = FactoryBot.create(:user)
    sign_in(user)

    visit new_annonce_path
    create_annonce_with_valid_data

    expect(page).to have_text('Annonce was successfully created.')
  end

  scenario "shows errors when annonce creation fails" do
    user = FactoryBot.create(:user)
    sign_in(user)

    visit new_annonce_path
    click_button 'Créer Annonce'

    expect(page).to have_text("Title can't be blank")
    expect(page).to have_text("Price can't be blank")
    expect(page).to have_text("Description can't be blank")
    expect(page).to have_text("Superficie can't be blank")
    expect(page).to have_text("Nombre de pièces can't be blank")
    expect(page).to have_text("Terrasse jardin can't be blank")
    expect(page).to have_text("City can't be blank")
  end

  def sign_in(user)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
  end

  def create_annonce_with_valid_data
    fill_in 'Titre', with: 'Test Annonce'
    fill_in 'Prix', with: 100
    fill_in 'Description', with: 'Test description'
    fill_in 'Superficie', with: 50
    fill_in 'Nombre de pièces', with: 3
    select 'Oui', from: 'Terrasse ou jardin'
    select 'Paris', from: 'Ville'
    click_button 'Créer Annonce'
  end
end



