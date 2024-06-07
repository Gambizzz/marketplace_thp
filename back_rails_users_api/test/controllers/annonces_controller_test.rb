require "test_helper"

class AnnoncesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @annonce = annonces(:one)
  end

  test "should get index" do
    get annonces_url, as: :json
    assert_response :success
  end

  test "should create annonce" do
    assert_difference("Annonce.count") do
      post annonces_url, params: { annonce: { description: @annonce.description, price: @annonce.price, title: @annonce.title } }, as: :json
    end

    assert_response :created
  end

  test "should show annonce" do
    get annonce_url(@annonce), as: :json
    assert_response :success
  end

  test "should update annonce" do
    patch annonce_url(@annonce), params: { annonce: { description: @annonce.description, price: @annonce.price, title: @annonce.title } }, as: :json
    assert_response :success
  end

  test "should destroy annonce" do
    assert_difference("Annonce.count", -1) do
      delete annonce_url(@annonce), as: :json
    end

    assert_response :no_content
  end
end
