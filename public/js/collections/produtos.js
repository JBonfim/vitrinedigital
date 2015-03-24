define([
    "underscore",
    "backbone",
    'backboneLocalstorage',
    "models/produto"
], function(_, Backbone, Store, Produto) {
    var ProdutosCollection = Backbone.Collection.extend({
        model: Produto,
        url: "/produtos" // url of the REST API
    });

    return new ProdutosCollection();
});
