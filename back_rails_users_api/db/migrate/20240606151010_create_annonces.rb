class CreateAnnonces < ActiveRecord::Migration[7.1]
  def change
    create_table :annonces do |t|
      t.string :title
      t.integer :price
      t.text :description
      t.integer :superficie
      t.integer :nombre_de_pieces
      t.boolean :terasse_jardin

      t.timestamps
    end
  end
end
