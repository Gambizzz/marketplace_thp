require 'faker'

User.destroy_all
Annonce.destroy_all


10.times do
  User.create!(
    email: Faker::Internet.unique.email,
    password: Faker::Internet.password
  )
end


12.times do
  Annonce.create!(
    title: Faker::Games::Fallout.location,
    price: Faker::Number.between(from: 100, to: 5000000),
    description: Faker::Quote.yoda,
    superficie: Faker::Number.between(from: 10, to: 600),
    nombre_de_pieces: Faker::Number.between(from: 1, to: 10),
    terasse_jardin: Faker::Boolean.boolean,
    user_id: User.pluck(:id).sample,
    image_url: Faker::LoremFlickr.unique.image
  )
end