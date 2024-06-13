require 'rails_helper'

RSpec.describe AnnoncesController, type: :controller do
  describe "GET #index" do
    it "assigns @annonces" do
      annonce = create(:annonce)
      get :index
      expect(assigns(:annonces)).to eq([annonce])
    end

    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end
  end

  describe "GET #show" do
    it "assigns @annonce" do
      annonce = create(:annonce)
      get :show, params: { id: annonce.id }
      expect(assigns(:annonce)).to eq(annonce)
    end

    it "renders the show template" do
      annonce = create(:annonce)
      get :show, params: { id: annonce.id }
      expect(response).to render_template("show")
    end
  end

  describe "GET #new" do
    it "renders the new template" do
      get :new
      expect(response).to render_template("new")
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new annonce" do
        expect {
          post :create, params: { annonce: FactoryBot.attributes_for(:annonce) }
        }.to change(Annonce, :count).by(1)
      end

      it "redirects to the new annonce" do
        post :create, params: { annonce: FactoryBot.attributes_for(:annonce) }
        expect(response).to redirect_to(Annonce.last)
      end
    end

    context "with invalid attributes" do
      it "does not create a new annonce" do
        expect {
          post :create, params: { annonce: FactoryBot.attributes_for(:annonce, title: nil) }
        }.to_not change(Annonce, :count)
      end

      it "re-renders the new method" do
        post :create, params: { annonce: FactoryBot.attributes_for(:annonce, title: nil) }
        expect(response).to render_template :new
      end
    end
  end

  describe "PUT #update" do
    before :each do
      @annonce = create(:annonce)
    end

    context "with valid attributes" do
      it "located the requested annonce" do
        put :update, params: { id: @annonce, annonce: FactoryBot.attributes_for(:annonce) }
        expect(assigns(:annonce)).to eq(@annonce)
      end

      it "changes @annonce's attributes" do
        put :update, params: { id: @annonce, annonce: FactoryBot.attributes_for(:annonce, title: "New Title") }
        @annonce.reload
        expect(@annonce.title).to eq("New Title")
      end

      it "redirects to the updated annonce" do
        put :update, params: { id: @annonce, annonce: FactoryBot.attributes_for(:annonce) }
        expect(response).to redirect_to @annonce
      end
    end

    context "with invalid attributes" do
      it "locates the requested annonce" do
        put :update, params: { id: @annonce, annonce: FactoryBot.attributes_for(:annonce, title: nil) }
        expect(assigns(:annonce)).to eq(@annonce)
      end

      it "does not change @annonce's attributes" do
        put :update, params: { id: @annonce, annonce: FactoryBot.attributes_for(:annonce, title: nil) }
        @annonce.reload
        expect(@annonce.title).to_not eq(nil)
      end

      it "re-renders the edit method" do
        put :update, params: { id: @annonce, annonce: FactoryBot.attributes_for(:annonce, title: nil) }
        expect(response).to render_template :edit
      end
    end
  end

  describe "DELETE #destroy" do
    before :each do
      @annonce = create(:annonce)
    end

    it "deletes the annonce" do
      expect {
        delete :destroy, params: { id: @annonce }
      }.to change(Annonce, :count).by(-1)
    end

    it "redirects to annonces#index" do
      delete :destroy, params: { id: @annonce }
      expect(response).to redirect_to annonces_url
    end
  end
end

