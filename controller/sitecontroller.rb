get '/vitrinedigital.com.br' do
  #send_file 'index.html'

  File.read(File.join('public', 'template/site_home.html'))
end

get '/vitrinedigital.com.br/home/estabelecimento/produto/detalhes' do
  #send_file 'index.html'

  File.read(File.join('public', 'template/detalhe_produto.html'))
end