define([
  'jquery',
  'underscore',
  'backbone',
  'models/produto',
  'models/estabelecimentos',
  'collections/promocoes',
  'collections/promocoes',
  'collections/Imagems',
  
  'views/anunciolistviwer',
  'views/detalheEstabelecimentoViwer',
  'views/detalhesProduto',
  'views/Upload',
  'text!templates/imgProdutoTemplate.html'
], function($, _, Backbone, Produto,Estabelecimento, PromocoesCollection,Promocoes,Imagems, AnuncioListView,DetalheEstabelecimentoView,DetalheProdutoView,Upload, imgprodutoTemplate){


  var ImgProdutoViwer = Backbone.View.extend({
    el: $("#produtoapp"),

    template: _.template(imgprodutoTemplate),

    initialize: function(){
      this.render();

    },


    render: function(){
      var that = this;
      var md = this.model.toJSON();
      $('.menu li').removeClass('active');
      $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      //this.$el.html(detalheEstabelecimento);
      
      this.$el.html(this.template(this.model.toJSON()));
      
    },
    upload:function(){
          app = new Upload({
        el: $('#produtoapp'),
        collection: Imagems
      }).render();
    }

             
  });


  return ImgProdutoViwer;
});
