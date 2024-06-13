FactoryBot.define do
  factory :annonce do
    title { Faker::Lorem.sentence }
    price { Faker::Number.number(digits: 5) }
    description { Faker::Lorem.paragraph }
    superficie { Faker::Number.number(digits: 3) }
    nombre_de_pieces { Faker::Number.between(from: 1, to: 10) }
    terrasse_jardin { [true, false].sample }
    city { Faker::Address.city }
    association :user
  end
end