define([
    "underscore",
    "backbone",
    'backboneLocalstorage',
    "models/promocao"
], function(_, Backbone, Store, Promocao) {
    var PromocoesCollection = Backbone.Collection.extend({
        model: Promocao,
        url: "/promocoes", // url of the REST API
       
    });

    return new PromocoesCollection();
});
