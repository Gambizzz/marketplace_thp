class AnnoncesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_annonce, only: %i[show update destroy]
  before_action :authorize_user!, only: %i[update destroy]

  def index
    @annonces = Annonce.all
    render json: @annonces.map { |annonce| annonce.as_json.merge(image_url: url_for(annonce.image)) }
  end

  def show
    render json: @annonce.as_json(include: { user: { only: :email } }).merge(image_url: url_for(@annonce.image))
  end

  def new
    @annonce = current_user.annonces.build
    render json: @annonce
  end

  def create
    @annonce = Annonce.new(annonce_params)
    @annonce.user = current_user

    if @annonce.save
      render json: @annonce, status: :created
    else
      render json: @annonce.errors, status: :unprocessable_entity
    end
  end

  def update
    @annonce = Annonce.find(params[:id])

    # mise à jour de l'image uniquement si une nouvelle image est fournie
    if annonce_params[:image].present?
      @annonce.image.attach(annonce_params[:image])
    end

    # Mise à jour des autres attributs
    if @annonce.update(annonce_params.except(:image))
      render json: @annonce.as_json.merge(image_url: url_for(@annonce.image))
    else
      render json: @annonce.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @annonce = Annonce.find(params[:id])
    @annonce.destroy
  end

  def mes_annonces
    @annonces = current_user.annonces
    render json: @annonces.map { |annonce| annonce.as_json.merge(image_url: url_for(annonce.image)) }
  end

  private

  def set_annonce
    @annonce = Annonce.find(params[:id])
  end

  def annonce_params
    params.require(:annonce).permit(:title, :price, :description, :superficie, :nombre_de_pieces, :terrasse_jardin, :image, :city)
  end

  def authorize_user!
    redirect_to annonces_path, alert: 'Not authorized' unless @annonce.user == current_user
  end
end

