require 'faker'

User.destroy_all
Annonce.destroy_all



10.times do
  user = User.create!(
    email: Faker::Internet.unique.email,
    password: Faker::Internet.password
  )
end


12.times do
  annonce = Annonce.create!(
    title: Faker::Games::Fallout.location,
    price: Faker::Number.between(from: 100, to: 5000000),
    description: Faker::Lorem.paragraph(sentence_count: 2),
    superficie: Faker::Number.between(from: 10, to: 600),
    nombre_de_pieces: Faker::Number.between(from: 1, to: 10),
    terasse_jardin: Faker::Boolean.boolean,
    city: ['Paris', 'Marseille', 'Toulouse'].sample,
    user_id: User.pluck(:id).sample,
  )

  annonce.image.attach( io: File.open(Rails.root.join('db/images/imageCard.avif')),
  filename: 'imageCard.avif')
end