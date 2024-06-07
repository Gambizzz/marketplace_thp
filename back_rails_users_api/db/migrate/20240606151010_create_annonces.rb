class CreateAnnonces < ActiveRecord::Migration[7.1]
  def change
    create_table :annonces do |t|
      t.string :title
      t.integer :price
      t.text :description

      t.timestamps
    end
  end
end
