class AddCityToAnnonces < ActiveRecord::Migration[7.1]
  def change
    add_column :annonces, :city, :string
  end
end
