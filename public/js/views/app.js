define(["jquery",
        "underscore",
        "backbone",
        "collections/usuarios",
        "views/usuario",
        "text!templates/app.html"
], function($, _, Backbone, Usuarios, UsuarioView, appTemplate) {

    var AppView = Backbone.View.extend({
        //console.log("iniciando carregamento do AppView");
        el: "#noteapp",



        //Mudar manipulacao da interface, PRIORIDADE2

        template: _.template(appTemplate),

        events : {
            "click #add-note": "createUser"
        },

        initialize: function() {
            //console.log("initialize");
            Usuarios.fetch(); // get notes from server
            this.render();

            // DOM elements
            this.$nome = this.$("#nome");
            this.$login = this.$("#login_usr");
            this.$senha = this.$("#senha");

            this.$userList = this.$("#note-list");
            console.log("login: ");
            console.log(this.$login.val());

            // events
            this.listenTo(Usuarios, "add", this.addUser);
            
            //console.log("initialize..... Fim");

        },

        render: function() {
            this.$el.html(this.template);
        },
        cadastrarUser:function(){
            //Mudar manipulacao da interface, PRIORIDADE2
        },

        createUser: function() {
           // var noteColor = this.$radios.filter(':checked').val();
            Usuarios.create({nome: this.$nome.val(), login: this.$login.val(),senha:this.$senha.val()})
        },

        addUser: function(usuario) {
            var view = new UsuarioView({model: usuario});
            this.$userList.append(view.render().el)
        }
    });

    return AppView;
    //console.log("concluiu carregamento do AppView");
});
