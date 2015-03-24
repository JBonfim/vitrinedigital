DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/development.sqlite")
#set :bind, '0.0.0.0'



class Produto < ActiveRecord::Base
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :nome, String, :length => 255
  property :preco, String, :length => 255
  property :descricao, String, :length => 1000
  property :categoria, String, :length => 255

  #has_many :promocaos,
  #         class_name: "Promocao",
  #         foreign_key: :produto_id

   has_many :produtos, class_name: "Promocao"
   accepts_nested_attributes_for :produtos

   def as_json(options = {})
    super(options.merge(include: :produtos)
  end

  

end


# Finalize the DataMapper models
DataMapper.finalize

# Tell DataMapper to update the database according to the definitions above
DataMapper.auto_upgrade!
