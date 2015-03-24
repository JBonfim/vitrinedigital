DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/development.sqlite")
#set :bind, '0.0.0.0'

require './model/estabelecimento'
require './model/produto'


class Promocao 
  include DataMapper::Resource
  
  property :id, Serial, :key => true
  belongs_to :estabelecimento
  belongs_to :produto

  
   
 

  
 

end


# Finalize the DataMapper models
DataMapper.finalize

# Tell DataMapper to update the database according to the definitions above
DataMapper.auto_upgrade!
