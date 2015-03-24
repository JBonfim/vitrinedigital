############ API REST ############

# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile
require 'sinatra' 
require 'sinatra/activerecord'
require 'bundler'
require './model/model'
Bundler.require

# Setup DataMapper with a database URL. On Heroku, ENV['DATABASE_URL'] will be
# set, when working locally this line will fall back to using SQLite in the
# current directory


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


                                

                                   # Metodos Estabelecimentos
get '/estabelecimento' do
  #send_file 'index.html'

  File.read(File.join('public', 'template/estabelecimento.html'))
end

get '/teste' do

  File.read(File.join('public', 'template/teste.html'))
end

# Route to show all Notes
get '/estabelecimentos' do
  content_type :json
  @estabelecimento = Estabelecimento.all

  @estabelecimento.to_json
  #erb :'estabelecimentos/estabelecimento'
  #File.read(File.join('public', 'teste.html'))
end


# CREATE: Route to create a new Note
post '/estabelecimentos' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read)

  @estabelecimento = Estabelecimento.new(json_params)

  if @estabelecimento.save
    @estabelecimento.to_json
  else
    halt 500
  end
end

# READ: Route to show a specific Note based on its "id"
get '/estabelecimentos/:id' do
  content_type :json
  @estabelecimento = Estabelecimento.get(params[:id].to_i)

  if @estabelecimento
    @estabelecimento.to_json
  else
    halt 404
  end
end

# UPDATE: Route to update a Note
put '/estabelecimentos/:id' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read.to_s)

  @estabelecimento = Estabelecimento.get(params[:id].to_i)
  @estabelecimento.update(json_params)

  if @estabelecimento.save
    @estabelecimento.to_json
  else
    halt 500
  end
end

# DELETE: Route to delete a Note
delete '/estabelecimentos/:id' do
  content_type :json
  @estabelecimento = Estabelecimento.get(params[:id].to_i)

  if @estabelecimento.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end





                                   




if Estabelecimento.count == 0
  Estabelecimento.create(:cnpj => "11111111111", :nome => "Moda Fachion", :rua => "Av. Getulio Vargas",
    :bairro => " Centro", :cidade => "Mamanguape",:email => "modafachion@gmail.com", :password => "teste")
  
end

