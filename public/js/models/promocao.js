define([
    "underscore",
    "backbone"
], function (_, Backbone) {
    var Promocao = Backbone.Model.extend({
        defaults: {

            estabelecimento_id: 0,
            produto_id: 0,            
            
        }
    });

    return Promocao;
}


);
