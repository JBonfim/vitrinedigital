define([
    "underscore",
    "backbone"
], function (_, Backbone) {
    var Estabelecimento = Backbone.Model.extend({
        defaults: {

            cnpj: "",
            razaosocial: "",
            rua: " ",
            bairro: "",
            cidade: " ",
            email: " ",
            password: ""
            
        }
    });

    return Estabelecimento;
}


);
