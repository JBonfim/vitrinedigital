define([
  'jquery',
  'underscore',
  'backbone',
  'models/promocao',
  'collections/promocoes',
  'collections/promocoes',
  'views/anunciolistviwer',
  'text!templates/detalheEstabelecimento.html'
], function($, _, Backbone, Promocao, PromocoesCollection,Promocoes, AnuncioListView, detalheEstabelecimento){

  var DetalheEstabelecimentoView = Backbone.View.extend({
    el: $("#page"),

    template: _.template(detalheEstabelecimento),

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
    }

             
  });

  return DetalheEstabelecimentoView;
});

  

