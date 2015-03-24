define([
    'jquery',
    'backbone',
    'collections/usuarios',
    'collections/estabelecimentos',
    'collections/produtos',
    'collections/promocoes',
], function ($, Backbone, Usuarios,Estabelecimentos,Produtos,Promocoes) {
    var UsuarioRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },
        setFilter: function(param) {
            Usuarios.trigger("filter", param);
            Estabelecimentos.trigger("filter", param);
            Produtos.trigger("filter", param);
            Promocoes.trigger("filter", param);
            
        }

    });

    return UsuarioRouter;
});