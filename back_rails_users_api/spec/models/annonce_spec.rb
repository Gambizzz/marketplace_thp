require 'rails_helper'

RSpec.describe Annonce, type: :model do
  describe 'associations' do
    it 'has one attached image' do
      annonce = Annonce.new
      expect(annonce.image).to be_an_instance_of(ActiveStorage::Attached::One)
    end

    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:price) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:superficie) }
    it { should validate_presence_of(:nombre_de_pieces) }
    it { should validate_presence_of(:city) }

    it 'validates inclusion of terrasse_jardin in [true, false]' do
      should allow_value(true).for(:terrasse_jardin)
      should allow_value(false).for(:terrasse_jardin)
      should_not allow_value(nil).for(:terrasse_jardin)
    end
  end
end
