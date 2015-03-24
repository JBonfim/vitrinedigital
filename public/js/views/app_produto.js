define(["jquery",
        "underscore",
        "backbone",
        "collections/produtos",
        "views/produto",
        "text!templates/cad_produto.html"
], function($, _, Backbone, Produtos, ProdutoView, appTemplate) {

    var AppProdutoView = Backbone.View.extend({
        //console.log("iniciando carregamento do AppView");
        el: "#produtoapp",

        template: _.template(appTemplate),




        //Mudar manipulacao da interface, PRIORIDADE2

        events : {
            "click .add_produto": "createProduto"

        },

        initialize: function() {
            //console.log("initialize");
            Produtos.fetch(); // get notes from server
                        //console.log("Produtos length1: "+Produtos.length);

            this.render();

            // DOM elements
            
            this.$nome = this.$(".nome");
            this.$preco = this.$(".preco");
            this.$descricao = this.$(".descricao");
            this.$categoria = this.$(".categoria");

            this.$produtoList = this.$("#list_produto");
           

            // events
            this.listenTo(Produtos, "add", this.addProduto);
            
           // console.log("initialize..... Fim");

        },

        render: function() {
            this.$el.html(this.template);
        },

        createProduto: function() {
           // var noteColor = this.$radios.filter(':checked').val();
           //console.log("createProduto..... Fim");
            Produtos.create({nome: this.$nome.val(), preco: this.$preco.val(),descricao:this.$descricao.val(),
                categoria: this.$categoria.val()})
            
        },

        addProduto: function(produto) {
            //console.log("VEIO EM ADDProduto..... Fim");
            var view = new ProdutoView({model: produto});
            this.$produtoList.append(view.render().el)
        }
    });

    return AppProdutoView;
    //console.log("concluiu carregamento do AppView");
});
