define(["jquery",
        "underscore",
        "backbone",
        "collections/estabelecimentos",
        "views/estabelecimento",
        "text!templates/cad_estabelecimento.html"
], function($, _, Backbone, Estabelecimentos, EstabelecimentoView, appTemplate) {

    var AppEstabView = Backbone.View.extend({
        //console.log("iniciando carregamento do AppView");
        el: "#estabeapp",


        //Mudar manipulacao da interface, PRIORIDADE2

        template: _.template(appTemplate),

        events : {
            "click #add-estab": "createEstabe"
        },

        initialize: function() {
            //console.log("initialize");
            Estabelecimentos.fetch(); // get notes from server
            //console.log("Estabelecimentos length1: "+Estabelecimentos.length);
            this.render();

            // DOM elements
            this.$cnpj = this.$("#cnpj");
            this.$razaosocial = this.$("#nome");
            this.$rua = this.$("#rua");
            this.$bairro = this.$("#bairro");
            this.$cidade = this.$("#cidade");
            this.$email = this.$("#email");
            this.$senha = this.$("#senha_estab");

            this.$estabeList = this.$("#list_estab");
           

            // events
            this.listenTo(Estabelecimentos, "add", this.addEstabe);
            
            //console.log("initialize..... Fim");

        },

        render: function() {
            this.$el.html(this.template);
        },

        createEstabe: function() {
           // var noteColor = this.$radios.filter(':checked').val();
           //console.log("createEstabe..... Fim");
            Estabelecimentos.create({cnpj: this.$cnpj.val(), razaosocial: this.$razaosocial.val(),rua:this.$rua.val(),
                bairro: this.$bairro.val(), cidade: this.$cidade.val(),email:this.$email.val(),password:this.$senha.val()})
            
        },

        addEstabe: function(estabelecimento) {
            //console.log("VEIO EM ADDESTABE..... Fim");
            var view = new EstabelecimentoView({model: estabelecimento});
            this.$estabeList.append(view.render().el)
        }
    });

    return AppEstabView;
    //console.log("concluiu carregamento do AppView");
});
