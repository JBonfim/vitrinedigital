// Filename: views/projects/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above,
  'models/promocao',
  'collections/promocoes',
  'text!templates/anuncioListTemplate.html'

], function($, _, Backbone, Promocao, PromocoesCollection, anuncioListTemplate){
  var AnuncioListView = Backbone.View.extend({
    el: $("#projects-list"),
    tamanho:0,
    anunciocollections : [],

    events: {
            "click .dtestab": "detalhestabelecimento",
            "click .edit": "editPromocao"
            
        },

    render: function(){
      console.log("veio no AnuncioListView....");
      var that = this;
      this.tamanho = this.collection.length;
       console.log("collection.length: "+this.tamanho);
      var promocoes = this.collection;
      promocoes.each(function(promo){
          var md = promo.toJSON();
           that.listarProduto(md,md.produto_id,md.estabelecimento_id);
      })
      
      
    },
    detalhestabelecimento: function(){
      this.$id_estab = this.$("#id_estabelecimento");
      //console.log("Veio em detalhestabelecimento");
      this.getEstab(id_estab.val(), function(estab){
            var est = estab.toJSON();
              alert("Estabelecimento: "+est.razaosocial);
          });


    },
      exibirview:function(modelo,produto,estabelecimento){
          //var md = modelo.toJSON();
          var promocao = new Promocao({
              id:modelo.id,estabelecimento_id:modelo.estabelecimento_id,produto_id:modelo.produto_id,
              produto:produto,estabelecimento:estabelecimento
          });
          this.anunciocollections.push(promocao);
          //console.log("Tamanho: "+this.anunciocollections.length);
           if(this.tamanho==this.anunciocollections.length){
              var that = this;
              var data = {
                  promocoes: that.anunciocollections,
                  _: _ 
                };

                var compiledTemplate = _.template( anuncioListTemplate, data );
                $('#projects-list').removeClass('active');
                $('#projects-list').parent().addClass('active');
                $("#projects-list").html( compiledTemplate );

            }

      },
      listarProduto:function(modelo,produto_id,estabelecimento_id){
        console.log("veio no AnuncioListView....");
          var that = this;
          var retorno = this.getProduto(produto_id,function(produto){ 
              that.listaEstabelecimento(modelo,estabelecimento_id,produto);
               });
      },
      listaEstabelecimento:function(modelo,estabelecimento_id,produto){
          var that = this;
          var prod = this.getEstab(estabelecimento_id, function(estab){
              that.exibirview(modelo,produto,estab);
          });
      },  
      
      getEstab: function(id, estabelecimento_callback){
          var url = 'http://localhost:9292/estabelecimentos/'+id;
          //console.log('getProdutos... ');
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
          //console.log('getProdutos... ');
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
  return AnuncioListView;
});
