class AddUserToAnnonces < ActiveRecord::Migration[7.1]
  def change
    add_reference :annonces, :user, null: false, foreign_key: true
  end
end

# user1 = User.find_by(id: 1) 