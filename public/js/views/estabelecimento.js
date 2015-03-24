define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/view_estabelecimento.html",
], function ($, _, Backbone, view_estabelecimentoTemplate) {
    var EstabelecimentoView = Backbone.View.extend({

        //console.log("iniciando carregamento do UsuarioView");
        tagName: "li",

        template: _.template(view_estabelecimentoTemplate),

        events: {
            "click .destroy": "removeNote",
            "click .edit": "editNote",
            "keypress .edit-input": "updateNote"
        },

        initialize: function() {
            // events
            //console.log("EstabelecimentoView...... initialize");
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, "destroy", this.remove);
            this.listenTo(this.model, 'show', this.showNote);
            this.listenTo(this.model, 'hide', this.hideNote);
        },

        render: function() {
            //console.log("EstabelecimentoView...... RENDER");
            this.$el.html(this.template(this.model.toJSON()));
            this.$cnpj = this.$(".edit-input");
             this.$razaosocial = this.$(".edit-input1");
             this.$rua = this.$(".edit-input2");
             this.$bairro = this.$(".edit-input3");
             this.$cidade = this.$(".edit-input4");
             this.$email = this.$(".edit-input5");
             

            console.log("EstabelecimentoView...... RENDER FInalizou");
            return this;
        },

        editNote: function() {
            //console.log("EstabelecimentoView...... editNote");
            this.$el.addClass('editing');

            this.$cnpj.focus();
            this.$razaosocial.focus();
            this.$rua.focus();
            this.$bairro.focus();
            this.$cidade.focus();
            this.$email.focus();
        },

        updateNote: function(e) {
            // 13 is "return/enter" code
           // console.log("EstabelecimentoView...... updateNote");
            if (e.keyCode === 13) {
                this.model.save({cnpj: this.$cnpj.val(),razaosocial: this.$razaosocial.val(),rua: this.$rua.val()
                    ,bairro: this.$bairro.val(),cidade: this.$cidade.val(),email: this.$email.val()});
                this.$el.removeClass('editing');
                
            }
        },

        removeNote: function() {
            //console.log("EstabelecimentoView...... removeNote");
            this.model.destroy();
        },

        hideNote: function() {
           // console.log("EstabelecimentoView...... hideNote");
            this.$el.addClass('hide');
        },

        showNote: function() {
            //console.log("EstabelecimentoView...... showNote");
            this.$el.removeClass('hide');
        }
    });
    //console.log("concluindo carregamento do UsuarioView");
    return EstabelecimentoView;
});
