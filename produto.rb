############ API REST ############

# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile
require 'sinatra' 
require 'sinatra/activerecord'
require 'bundler'
require './controller/usuariocontroller'
Bundler.require

# Setup DataMapper with a database URL. On Heroku, ENV['DATABASE_URL'] will be
# set, when working locally this line will fall back to using SQLite in the
# current directory
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/development.sqlite")
#set :bind, '0.0.0.0'



class Produto
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :nome, String, :length => 255
  property :preco, String, :length => 255
  property :descricao, String, :length => 1000
  property :categoria, String, :length => 255
  

end


# Finalize the DataMapper models
DataMapper.finalize

# Tell DataMapper to update the database according to the definitions above
DataMapper.auto_upgrade!

# Index route
get '/' do
  #send_file 'index.html'

  File.read(File.join('public', 'index.html'))
end
get '/estabelecimento/home' do
  #send_file 'index.html'

  File.read(File.join('public', 'template/home_estabelecimento.html'))
end
get '/login' do
  #send_file 'index.html'

  File.read(File.join('public', 'template/login.html'))
end
get '/home' do
  #send_file 'index.html'

  File.read(File.join('public', 'index.html'))
end


   

                                   # Metodos Produtos

get '/estabelecimento/produto' do
  #send_file 'produto.html'

  File.read(File.join('public', 'template/produto.html'))
end
get '/estabelecimento/produto/edit' do
  #send_file 'produto.html'

  File.read(File.join('public', 'template/produto_edit.html'))
end
#get '/teste' do

 # File.read(File.join('public', 'template/teste.html'))
#end

# Route to show all Notes
get '/produtos' do
  content_type :json
  @produto = Produto.all

  @produto.to_json
  #erb :'estabelecimentos/estabelecimento'
  #File.read(File.join('public', 'teste.html'))
end


# CREATE: Route to create a new Note
post '/produtos' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read)

  @produto = Produto.new(json_params)

  if @produto.save
    @produto.to_json
  else
    halt 500
  end
end

# READ: Route to show a specific Note based on its "id"
get '/produtos/:id' do
  content_type :json
  @produto = Produto.get(params[:id].to_i)

  if @produto
    @produto.to_json
  else
    halt 404
  end
end

# UPDATE: Route to update a Note
put '/produtos/:id' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read.to_s)

  @produto = Produto.get(params[:id].to_i)
  @produto.update(json_params)

  if @produto.save
    @produto.to_json
  else
    halt 500
  end
end

# DELETE: Route to delete a Note
delete '/produtos/:id' do
  content_type :json
  @produto = Produto.get(params[:id].to_i)

  if @produto.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end



if Produto.count == 0
  Produto.create(:nome => "Geladeira", :preco => "800.00", :descricao => "O Melhor", :categoria =>"Cozinha")
  
end