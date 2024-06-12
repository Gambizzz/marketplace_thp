class ApplicationController < ActionController::API
  def fetch_cities
    num_cities = 3
    @cities = fetch_cities_from_file("cities.txt", num_cities)
    render json: @cities
  end

  private

  def fetch_cities_from_file(filename, num_cities = 3)
    cities = []
    File.open(filename, "r") do |file|
      num_cities.times { cities << file.readline.chomp }
    end
    cities
  end
end
