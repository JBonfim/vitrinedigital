define(["jquery",
        "underscore",
        "backbone",
        "collections/promocoes",
        "views/promocao",
        "text!templates/cad_promocao.html"
], function($, _, Backbone, Promocoes, PromocaoView, appTemplate) {

    var AppPromocaoView = Backbone.View.extend({
        //console.log("iniciando carregamento do AppView");
        el: "#promocaoapp",
        elemento : [],
       
        template: _.template(appTemplate),


        //Mudar manipulacao da interface, PRIORIDADE2

        events : {
            "click .add_promocao": "createPromocao"
        },

        initialize: function() {
            var that = this;
            var prodmodelo={};
            
            Promocoes.fetch({context:Promocoes}).done(function(){
                //console.log("Novo: "+this.size())
                var promocao = this;
                promocao.each(function(promo){

                     var md = promo.toJSON();
                    //console.log("ID Estabelecimento: "+md.estabelecimento_id); 
                    //var produto = 
                   

                    
                    //var produto = 
                    //that.listProduto(md.produto_id);

                    
                    

                    var model = {};
                    //console("Se deu Certo O valor é: "+produto);
                })
                //that.render();
                //that.listarEstab();


            }); 


           
           
            this.render();

            // DOM elements
            
            this.$id_estabelecimento = this.$(".id_estabelecimento");
            this.$id_produto = this.$(".id_produto");

            this.$promocoesList = this.$("#list_promocao");

           

            // events
            this.listenTo(Promocoes, "add", this.addPromocao);
            
            //console.log("initialize..... Fim");

        },

        render: function() {
            
           // console.log("initialize app_promocao");
            // this.listarEstab();
            this.$el.html(this.template);
            
            //console.log("initialize app_promocao passou por forEach");
           
        },
        listProduto:function(produto_id){
            that = this;
            var prod = this.getProduto(produto_id, function(produto){
                var produt = {id : produto['id'],nome : produto['nome']};
                //console.log("id: "+produto.id+" Produto: "+produto.nome);
                
                that.prodmodelo = produt;
                that.adicionarPromocao(that.prodmodelo);
            });
            //var mod = that.adicionarPromocao
            //console.log("id: "+that.prodmodelo);
             //return prod;
        },
        adicionarPromocao:function(modelo){
            //console.log("id: "+that.prodmodelo.id+" Produto: "+modelo.nome);
            return modelo;
        },
        

        getProduto: function(id, produto_callback){
            var url = 'http://localhost:9292/produtos/'+id;
            //console.log("URL: "+url);
            console.log('getProdutos... ');
            $.ajax({
                url: url,
                type:'GET',
                dataType:"json",
                success:function (data) {
                    //console.log("DATA: "+data);
                    produto_callback(data);
                },
            });
        },
        listarEstab:function(){
            //var colecao =  new Promocoes();
            //colecao.fetch();
                
           
                var length = Promocoes.length;
                
                for (var i = 0; i < length; i++) {
                    //$('#post-list', this.el).append(new PostItemView({model: posts[i]}).render().el);
                    var mod = Promocoes.toJSON();
                   //console.log("Olha agora deu certo: {estabelecimento_id:"+mod[i].estabelecimento_id
                     //   +", produto_id: "+mod[i].produto_id);
                }                
            
          
            
        },

        createPromocao: function() {
          
           
            Promocoes.create({estabelecimento_id: this.$id_estabelecimento.val(), produto_id: this.$id_produto.val()})
            
        },

        addPromocao: function(promocao) {
            
            var view = new PromocaoView({model: promocao});
            this.$promocoesList.append(view.render().el)
            this.listarEstab();
        }
    });

    return AppPromocaoView;
    //console.log("concluiu carregamento do AppView");
});
