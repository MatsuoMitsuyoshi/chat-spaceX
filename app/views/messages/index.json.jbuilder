# if @new_message.present?
json.array! @new_messages.each do |message|
  json.name message.user.name
  json.date message.created_at
  json.content message.content
  json.image message.image.url
  json.id message.id
end
