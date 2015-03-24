Bundler.require
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/development.sqlite")
#set :bind, '0.0.0.0'
require 'sinatra' 
require 'sinatra/activerecord'


class Usuario
  include DataMapper::Resource

  
  property :id, Serial, :key => true
  property :nome, String, :length => 255
  property :login, String, :length => 255
  property :senha, String, :length => 255
 
end

class Estabelecimento 
  ##attr_accessible :id, :cnpj, :nome, :rua, :bairro, :cidade, :email, :password
 

  include DataMapper::Resource

  

  property :id, Serial, :key => true
  property :cnpj, String, :length => 255
  property :razaosocial, String, :length => 255
  property :rua, String, :length => 255
  property :bairro, String, :length => 255
  property :cidade, String, :length => 255
  property :email, String, :length => 255
  property :password, String, :length => 255

 

  def as_json(options = {})
    super(options.merge(only: [:id, :cnpj, :razaosocial, :rua, :bairro, :cidade, :email]))
  end



end

class Produto 
  include DataMapper::Resource
  #attr_accessible :id, :nome, :preco, :descricao, :categoria

  property :id, Serial, :key => true
  property :nome, String, :length => 255
  property :preco, String, :length => 255
  property :descricao, String, :length => 1000
  property :categoria, String, :length => 255

   def as_json(options = {})
    super(options.merge(only: [:id, :nome, :preco, :descricao, :categoria]))
  end


  

end

class Promocao 
  include DataMapper::Resource

  property :id, Serial, :key => true

  belongs_to :estabelecimento
  belongs_to :produto 

  
  #has_many :estabelecimentos, class_name: "Estabelecimento"
  #has_many :estabelecimento_id, class_name: "Estabelecimento"
 # accepts_nested_attributes_for :estabelecimentos

  
 # def as_json(options = {})
  #  super(options.merge(only: [:id,:estabelecimento_id]))
 # end

  #def as_json(options = {})
   # super(options.merge(include: :estabelecimento))
  #end

  def to_json(options = {})
    super(options.merge(:only => [ :id]))
  end
  def to_json(options = {})
    super(options.merge(include: :estabelecimento_id))
  end

end


# Finalize the DataMapper models
DataMapper.finalize

# Tell DataMapper to update the database according to the definitions above
DataMapper.auto_upgrade!
