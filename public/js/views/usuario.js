define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/note.html",
], function ($, _, Backbone, noteTemplate) {
    /*
    var AppView = Backbone.View.extend({
        //console.log("iniciando carregamento do AppView");
        el: "#noteapp",

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
            
        },

        createUser: function() {
           // var noteColor = this.$radios.filter(':checked').val();
            Usuarios.create({nome: this.$nome.val(), login: this.$login.val(),senha:this.$senha.val()})
        },

        addUser: function(usuario) {
            var view = new UsuarioView({model: usuario});
            this.$userList.append(view.render().el)
        }
    });*/

    var UsuarioView = Backbone.View.extend({
        //console.log("iniciando carregamento do UsuarioView");
        tagName: "li",

        template: _.template(noteTemplate),

        events: {
            "click .destroy": "removeNote",
            "click .edit": "editNote",
            "keypress .edit-input": "updateNote"
        },

        initialize: function() {
            // events
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, "destroy", this.remove);
            this.listenTo(this.model, 'show', this.showNote);
            this.listenTo(this.model, 'hide', this.hideNote);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$input = this.$(".edit-input");
            return this;
        },

        editNote: function() {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        updateNote: function(e) {
            // 13 is "return/enter" code
            if (e.keyCode === 13) {
                this.model.save({nome: this.$input.val()});
                this.$el.removeClass('editing');
            }
        },

        removeNote: function() {
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
    return UsuarioView;
});
