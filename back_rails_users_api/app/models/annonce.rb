class Annonce < ApplicationRecord
  belongs_to :user 

  validates :title, :price, :description, :superficie, :nombre_de_pieces, presence: true
  validates_inclusion_of :terrasse_jardin, in: [true, false], allow_nil: false
  validates :city, presence: true
  
  has_one_attached :image
end

