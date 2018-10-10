FactoryBot.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/spec/fixtures/530713_m.jpg")
    user
    group
  end
end
