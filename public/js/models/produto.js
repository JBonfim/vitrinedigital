define([
    "underscore",
    "backbone"
], function (_, Backbone) {
    var Produto = Backbone.Model.extend({
        defaults: {

            nome: "",
            preco: "",
            descricao: " ",
            categoria: "",
            
            
        }
    });

    return Produto;
}


);
