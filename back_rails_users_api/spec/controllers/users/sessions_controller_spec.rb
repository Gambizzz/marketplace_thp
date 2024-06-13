# spec/controllers/users/sessions_controller_spec.rb
require 'rails_helper'

RSpec.describe Users::SessionsController, type: :controller do
  describe "POST #create" do
    context "with valid attributes" do
      let(:user) { create(:user) }

      it "returns a success response" do
        post :create, params: { user: { email: user.email, password: user.password } }
        expect(response).to be_successful
      end
    end

    context "with invalid attributes" do
      it "returns an unauthorized response" do
        post :create, params: { user: { email: "invalid@example.com", password: "wrong_password" } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE #destroy" do
    let(:user) { create(:user) }

    it "returns a success response" do
      sign_in user
      delete :destroy
      expect(response).to be_successful
    end
  end
end
