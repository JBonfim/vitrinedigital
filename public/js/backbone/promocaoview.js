window.AppPromocaoView = Backbone.View.extend({
        //console.log("iniciando carregamento do AppView");
        el: "#promocaoapp",

        template: _.template(appTemplate),

        events : {
            "click .add_promocao": "createPromocao"
        },

        initialize: function() {
            
            Promocoes.fetch(); // get notes from server
            console.log("length1: "+Promocoes.length);
            //Promocoes.forEach(function(){
              //      console.log("initialize app_promocao passou por forEach1");
                //});
           
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
            console.log("initialize app_promocao");
             this.listarEstab();
            this.$el.html(this.template);
            
            console.log("initialize app_promocao passou por forEach");
           
        },
        listarEstab:function(){
            //var colecao =  new Promocoes();
            //colecao.fetch();
                
            //console.log("length5.5: "+colecao.length);
                var length = Promocoes.length;
               
                console.log("length: "+length);
                
                
                for (var i = 0; i < length; i++) {
                    //$('#post-list', this.el).append(new PostItemView({model: posts[i]}).render().el);
                    var mod = Promocoes.toJSON();
                    console.log(mod[i].estabelecimento_id);
                }

                
            
           //console.log(teste.get(estabelecimento_id));
            
        },

        createPromocao: function() {
           // var noteColor = this.$radios.filter(':checked').val();
           
            Promocoes.create({estabelecimento_id: this.$id_estabelecimento.val(), produto_id: this.$id_produto.val()})
            
        },

        addPromocao: function(promocao) {
            
            var view = new PromocaoView({model: promocao});
            this.$promocoesList.append(view.render().el)
        }
    });