define([
    "underscore",
    "backbone",
    'backboneLocalstorage',
    "models/models"
], function(_, Backbone, Store, Usuario,Estabelecimento) {
    var UsuariosCollection = Backbone.Collection.extend({
        model: Usuario,
        url: "usuarios" // url of the REST API
    });

    return new UsuariosCollection();
    ,
    var EstabelecimentosCollection = Backbone.Collection.extend({
        model: Estabelecimento,
        url: "estabelecimentos" // url of the REST API
    });

    return new EstabelecimentosCollection();

});
define([
    "underscore",
    "backbone",
    'backboneLocalstorage',
    "models/models"
], function(_, Backbone, Store, Usuario,Estabelecimento) {
    var UsuariosCollection = Backbone.Collection.extend({
        model: Usuario,
        url: "usuarios" // url of the REST API
    });

    return new UsuariosCollection();
    ,
    var EstabelecimentosCollection = Backbone.Collection.extend({
        model: Estabelecimento,
        url: "estabelecimentos" // url of the REST API
    });

    return new EstabelecimentosCollection();

});

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
