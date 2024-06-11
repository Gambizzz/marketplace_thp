class Annonce < ApplicationRecord
    belongs_to :user 
    validates :title, :price, :description, :superficie, :nombre_de_pieces, presence: true
    validates_inclusion_of :terasse_jardin, in: [true, false], allow_nil: false
    has_one_attached :image

    def image_url
        Rails.application.routes.url_helpers.rails_blob_url(self.image, only_path: true) if self.image.attached?
    end


end
