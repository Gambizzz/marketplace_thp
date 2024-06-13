require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:annonces).dependent(:destroy) }
  end

  describe 'devise modules' do
    it 'includes database_authenticatable' do
      expect(User.ancestors).to include(Devise::Models::DatabaseAuthenticatable)
    end

    it 'includes registerable' do
      expect(User.ancestors).to include(Devise::Models::Registerable)
    end

    it 'includes recoverable' do
      expect(User.ancestors).to include(Devise::Models::Recoverable)
    end

    it 'includes rememberable' do
      expect(User.ancestors).to include(Devise::Models::Rememberable)
    end

    it 'includes validatable' do
      expect(User.ancestors).to include(Devise::Models::Validatable)
    end

    it 'includes jwt_authenticatable' do
      expect(User.ancestors).to include(Devise::Models::JwtAuthenticatable)
    end
  end
end
