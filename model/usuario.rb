Bundler.require
#DataMapper.initizialazi
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/development.sqlite")
#set :bind, '0.0.0.0'

# Define a simple DataMapper model
class Usuario
  include DataMapper::Resource

  
  property :id, Serial, :key => true
  property :nome, String, :length => 255
  property :login, String, :length => 255
  property :senha, String, :length => 255
 
end





# Finalize the DataMapper models
DataMapper.finalize

# Tell DataMapper to update the database according to the definitions above
DataMapper.auto_upgrade!
