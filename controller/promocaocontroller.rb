############ API REST ############

# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile
require 'sinatra' 
require 'sinatra/activerecord'
require 'bundler'
require 'json'
require './model/model'

Bundler.require

# Setup DataMapper with a database URL. On Heroku, ENV['DATABASE_URL'] will be
# set, when working locally this line will fall back to using SQLite in the
# current directory
get '/teste2' do
  #send_file 'index.html'

  File.read(File.join('public', 'teste/index.html'))
end

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


get '/estabelecimento/promocao' do
  #send_file 'index.html'

  File.read(File.join('public', 'template/promocao.html'))
end

# Route to show all Notes
get '/promocoes' do
  content_type :json
  @promocao = Promocao.all

  @promocao.as_json(include: :estabelecimento_id)
  @promocao.to_json
  #@promocao.to_json(:produto_id)
  #@promocao.to_json
  #@promocao.to_json(:methods => :permalink)
  #ActiveRecord::Base.include_root_in_json = false
  #@promocao.to_json(:methods => :permalink)
  #erb :'estabelecimentos/estabelecimento'
  #File.read(File.join('public', 'teste.html'))
end


# CREATE: Route to create a new Note
post '/promocoes' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read)

  @promocao = Promocao.new(json_params)

  if @promocao.save
    @promocao.to_json
  else
    halt 500
  end
end

# READ: Route to show a specific Note based on its "id"
get '/promocoes/:id' do
  content_type :json
  @promocao = Promocao.get(params[:id].to_i)

  if @promocao
    @promocao.to_json
  else
    halt 404
  end
end

# UPDATE: Route to update a Note
put '/promocoes/:id' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  json_params = JSON.parse(request.body.read.to_s)

  @promocao = Promocao.get(params[:id].to_i)
  @promocao.update(json_params)

  if @promocao.save
    @promocao.to_json
  else
    halt 500
  end
end

# DELETE: Route to delete a Note
delete '/promocoes/:id' do
  content_type :json
  @promocao = Promocao.get(params[:id].to_i)

  if @promocao.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end





                                   




if Promocao.count == 1
  #task = Task.get(params[:task])
  #annote = task.annotations.create(:content => params[:content])
  #task.update(:sub_annotations =>task.sub_annotations+1)
  id = 1
  @estabelecimento = Estabelecimento.get(16)
  @produto = Produto.get(2)  
  Promocao.create(

    :estabelecimento => @estabelecimento, 

    :produto => @produto)
  
end

