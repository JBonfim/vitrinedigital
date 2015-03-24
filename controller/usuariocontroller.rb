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


                                 # Metodos Usuario

get '/usuario' do
  #send_file 'index.html'

  File.read(File.join('public', 'template/usuario.html'))
end

# Route to show all Notes
get '/usuarios' do
  content_type :json
  @usuarios = Usuario.all

  @usuarios.to_json
end
                         
# CREATE: Route to create a new Note
post '/usuarios' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read)

  @usuario = Usuario.new(json_params)

  if @usuario.save
    @usuario.to_json
  else
    halt 500
  end
end

# READ: Route to show a specific Note based on its "id"
get '/usuarios/:id' do
  content_type :json
  @usuario = Usuario.get(params[:id].to_i)

  if @usuario
    @usuario.to_json
  else
    halt 404
  end
end

# UPDATE: Route to update a Note
put '/usuarios/:id' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read.to_s)

  @usuario = Usuario.get(params[:id].to_i)
  @usuario.update(json_params)

  if @usuario.save
    @usuario.to_json
  else
    halt 500
  end
end

# DELETE: Route to delete a Note
delete '/usuarios/:id' do
  content_type :json
  @usuario = Usuario.get(params[:id].to_i)

  if @usuario.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end

                                   





                                   

if Usuario.count == 0
  Usuario.create(:nome => "Jabes", :login => "JBonfim", :senha => "1234")
  
end



