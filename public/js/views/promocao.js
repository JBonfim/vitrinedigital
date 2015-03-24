define([
    "jquery",
    "underscore",
    "backbone",
    "models/promocao",
    "text!templates/view_promocao.html",
], function ($, _, Backbone,PromocaoModel, view_promocaoTemplate) {
    var PromocaoView = Backbone.View.extend({
        tagName: "li",

        template: _.template(view_promocaoTemplate),

        events: {
            "click .destroy": "removePromocao",
            "click .edit": "editPromocao"
            
        },

        initialize: function() {
            // events
            
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, "destroy", this.remove);
            
        },

        render: function() {
            var md = this.model.toJSON();
            this.listarProduto(md.produto_id,md.estabelecimento_id);            
            return this;
        },
        exibirview:function(produto,estabelecimento){
            var md = this.model.toJSON();
            var promocao = new PromocaoModel({
                id:md.id,estabelecimento_id:md.estabelecimento_id,produto_id:md.produto_id,
                produto:produto,estabelecimento:estabelecimento
            });
            this.$el.html(this.template(promocao.toJSON()));

        },
        listarProduto:function(produto_id,estabelecimento_id){
            var that = this;
            var retorno = this.getProduto(produto_id,function(produto){ 
                that.listaEstabelecimento(estabelecimento_id,produto);
                 });
        },
        listaEstabelecimento:function(estabelecimento_id,modelo){
            var that = this;
            var prod = this.getEstab(estabelecimento_id, function(estab){
                that.exibirview(modelo,estab);
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
        },
             

        removePromocao: function() {
            
            this.model.destroy();
        }
    });
    return PromocaoView;
});
