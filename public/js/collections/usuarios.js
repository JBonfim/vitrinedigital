define([
    "underscore",
    "backbone",
    'backboneLocalstorage',
    "models/usuario"
], function(_, Backbone, Store, Usuario) {
    var UsuariosCollection = Backbone.Collection.extend({
        model: Usuario,
        url: "/usuarios" // url of the REST API
    });

    return new UsuariosCollection();
});
