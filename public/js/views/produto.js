define([
    "jquery",
    "underscore",
    "backbone",
    'models/produto',
    'views/imgProdutoviwer',
    "text!templates/view_produto.html",
], function ($, _, Backbone,Produto,ImgProdutoViwer, view_produtoTemplate) {
    var ProdutoView = Backbone.View.extend({

        //console.log("iniciando carregamento do UsuarioView");
        tagName: "li",

        template: _.template(view_produtoTemplate),

        events: {
            "click .destroy": "removeProduto",
            "click .edit": "editProduto",
            "click .addIMG": "addIMGProduto",
            "keypress .edit-input": "updateProduto"
        },

        initialize: function() {
            // events
            //console.log("ProdutoView...... initialize");
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, "destroy", this.remove);
            this.listenTo(this.model, 'show', this.showNote);
            this.listenTo(this.model, 'hide', this.hideNote);
        },

        render: function() {
            //console.log("ProdutoView...... RENDER");
            this.$el.html(this.template(this.model.toJSON()));
            this.$input = this.$(".edit-input");
            this.$preco = this.$(".edit-preco");
            this.$categoria = this.$(".edit-categoria");

            
            
            
            return this;
        },
        addIMGProduto:function(){
            var that = this;
              this.$id_produto = this.$("#idProduto");
              console.log("Veio em id_produto, valor: "+this.$id_produto.val());
              this.getProduto(this.$id_produto.val(), function(produto){
                    //var est = estab.toJSON();
                      //alert("Estabelecimento: "+estab.razaosocial);
                      var p = new Produto(produto);
                      var viwer = new ImgProdutoViwer({model:p});
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
          },

        editProduto: function() {
            
            this.$el.addClass('editing');
            this.$input.focus();
            this.$preco.focus();
            this.$categoria.focus();
            
            
             
        },

        updateProduto: function(e) {
            // 13 is "return/enter" code
            
            if (e.keyCode === 13) {
                this.model.save({nome: this.$input.val(),preco: this.$preco.val(),categoria: this.$categoria.val()});
                this.$el.removeClass('editing');
            }
        },

        removeProduto: function() {
            
            this.model.destroy();
        },

        hideNote: function() {
           
            this.$el.addClass('hide');
        },

        showNote: function() {
           
            this.$el.removeClass('hide');
        }
    });
    //console.log("concluindo carregamento do UsuarioView");
    return ProdutoView;
});
