json.array!(@users) do |user|
  json.extract! user, :name, :last_name, :birth_date, :address, :phone_number
  json.url user_url(user, format: :json)
end
