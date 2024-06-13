# spec/controllers/users/registrations_controller_spec.rb
require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new user" do
        expect {
          post :create, params: { user: FactoryBot.attributes_for(:user) }
        }.to change(User, :count).by(1)
      end

      it "returns a success response" do
        post :create, params: { user: FactoryBot.attributes_for(:user) }
        expect(response).to be_successful
      end
    end

    context "with invalid attributes" do
      it "does not create a new user" do
        expect {
          post :create, params: { user: FactoryBot.attributes_for(:user, email: nil) }
        }.to_not change(User, :count)
      end

      it "returns an unprocessable entity response" do
        post :create, params: { user: FactoryBot.attributes_for(:user, email: nil) }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
