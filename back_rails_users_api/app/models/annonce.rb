class Annonce < ApplicationRecord
    belongs_to :user 
    validates :title, :price, :description, presence: true

end
