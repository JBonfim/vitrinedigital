define([
  'jquery',
  'underscore',
  'backbone',
  'models/produto',
  'models/estabelecimentos',
  'collections/promocoes',
  'collections/promocoes',
  'views/anunciolistviwer',
  'views/detalheEstabelecimentoViwer',
  'views/detalhesProduto',
  'text!templates/anuncioTemplate.html'
], function($, _, Backbone, Produto,Estabelecimento, PromocoesCollection,Promocoes, AnuncioListView,DetalheEstabelecimento,DetalheProdutoView, anuncioTemplate){

  var AnunciosView = Backbone.View.extend({
    el: $("#page"),
    anunciocollections : [],

     events: {
            "click .dtestab": "detalhestabelecimento",
            "click .tdproduto": "detalheproduto",
            "click .home": "home"
            
        },

    initialize: function(){
      console.log("veio no initialize....");
      var that = this;
      PromocoesCollection.fetch({context:PromocoesCollection}).done(function(){
        that.render();
        console.log("Promocoes size...."+PromocoesCollection.size());
      });


    },


    render: function(){
      console.log("veio no render....");
      var that = this;
      $('.menu li').removeClass('active');
      $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.html(anuncioTemplate);

      var promocoesListView = new AnuncioListView({ collection: PromocoesCollection});     
      promocoesListView.render();

    },
    reset:function(){
      
      viwer.render();
    },
    detalhestabelecimento: function(){
      var that = this;
      this.$id_estab = this.$("#id_estabelecimento");
      console.log("Veio em detalhestabelecimento, valor: "+this.$id_estab.val());
      this.getEstab(this.$id_estab.val(), function(estab){
            //var est = estab.toJSON();
              //alert("Estabelecimento: "+estab.razaosocial);
              var e = new Estabelecimento(estab);
              console.log("ID produto: "+e.id);
              var viwer = new DetalheEstabelecimento({model:e});
              //var viwer = new DetalheProdutoView({model:e});
          });
    },
    detalheproduto:function(){
       var that = this;
      this.$id_prod = this.$("#id_produto");
      this.getProduto(this.$id_prod.val(), function(produt){
            //var est = estab.toJSON();
              //alert("Estabelecimento: "+estab.razaosocial);
              var p = new Produto(produt);
              var viwer = new DetalheProdutoView({model:p});
          });

    }, 
    home:function(){
      console.log("Redirecionando pra home no anuncioviwer....");
      this.initialize();
    } ,    
      getEstab: function(id, estabelecimento_callback){
          var url = 'http://localhost:9292/estabelecimentos/'+id;
          console.log('getProdutos... ');
          $.ajax({
              url: url,
              type:'GET',
              dataType:"json",
              success:function (data) {
                estabelecimento_callback(data);
              },
          });
      },
      getProduto: function(id, produto_callback){
          var url = 'http://localhost:9292/produtos/'+id;
          console.log('getProdutos... ');
          $.ajax({
              url: url,
              type:'GET',
              dataType:"json",
              success:function (data) {
                  produto_callback(data);
              },
          });
      }
             
  });

  return AnunciosView;
});
