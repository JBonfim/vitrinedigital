#bundle exec rackup config.ru
require 'bundler/setup'

require './serven'


#run FileUpload
run Sinatra::Application