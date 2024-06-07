require "test_helper"

class AnnonceControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get annonce_index_url
    assert_response :success
  end

  test "should get show" do
    get annonce_show_url
    assert_response :success
  end

  test "should get new" do
    get annonce_new_url
    assert_response :success
  end

  test "should get create" do
    get annonce_create_url
    assert_response :success
  end
end
