DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/development.sqlite")
#set :bind, '0.0.0.0'

# Define a simple DataMapper model

class Estabelecimento 
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :cnpj, String, :length => 255
  property :nome, String, :length => 255
  property :rua, String, :length => 255
  property :bairro, String, :length => 255
  property :cidade, String, :length => 255
  property :email, String, :length => 255
  property :password, String, :length => 255


   #has_many :promocaos,
  #         class_name: "Promocao",
  #         foreign_key: :produto_id

   

end




# Finalize the DataMapper models
DataMapper.finalize

# Tell DataMapper to update the database according to the definitions above
DataMapper.auto_upgrade!