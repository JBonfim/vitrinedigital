define([
    "underscore",
    "backbone",
    'backboneLocalstorage',
    "models/estabelecimentos"
], function(_, Backbone, Store, Estabelecimento) {
    var EstabelecimentosCollection = Backbone.Collection.extend({
        model: Estabelecimento,
        url: "/estabelecimentos" // url of the REST API
    });

    return new EstabelecimentosCollection();
});