define([
    "underscore",
    "backbone"
], function (_, Backbone) {
    var Usuario = Backbone.Model.extend({
        defaults: {
            nome: "",
            login: "",
            senha: ""
        }
    });

    return Usuario;
}


);
