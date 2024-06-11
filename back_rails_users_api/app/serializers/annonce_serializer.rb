class AnnonceSerializer < ActiveModel::Serializer
    attributes :id, :title, :price, :description, :superficie, :nombre_de_pieces, :terasse_jardin, :created_at, :updated_at, :user_id
  
    belongs_to :user
end
  