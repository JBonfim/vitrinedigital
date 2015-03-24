############ API REST ############

# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile
require 'sinatra' 
require 'sinatra/activerecord'
require 'bundler'

require './controller/usuariocontroller'
require './controller/estabelecimentocontroller'
require './controller/produtocontroller'
require './controller/promocaocontroller'
require './controller/sitecontroller'
require './controller/UploadFileControler'

Bundler.require

# Setup DataMapper with a database URL. On Heroku, ENV['DATABASE_URL'] will be
# set, when working locally this line will fall back to using SQLite in the
# current directory
