class AnnoncesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_annonce, only: %i[show update destroy]
  before_action :authorize_user!, only: %i[update destroy]

  # GET /annonces
  def index
    @annonces = Annonce.all
    render json: @annonces
  end

  # GET /annonces/1
  def show
    @annonce = current_user.annonces.find(params[:id])
    render json: @annonce
  end

  # GET /annonces/new
  def new
    @annonce = current_user.annonces.build
    render json: @annonce
  end

  # POST /annonces
  def create
    @annonce = Annonce.new(annonce_params)
    @annonce.user = current_user


    if @annonce.save
      render json: @annonce, status: :created
    else
      render json: @annonce.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /annonces/1
  def update
    if @annonce.update(annonce_params)
      render json: @annonce
    else
      render json: @annonce.errors, status: :unprocessable_entity
    end
  end

  # DELETE /annonces/1
  def destroy
    @annonce.destroy
  end

  private

    def set_annonce
      @annonce = Annonce.find(params[:id])
    end


    def annonce_params
      params.require(:annonce).permit(:title, :price, :description)
    end


    def authorize_user!
      redirect_to annonces_path, alert: 'Not authorized' unless @annonce.user == current_user
    end
end