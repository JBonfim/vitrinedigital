define([
    'jquery',
    'backbone',
    'collections/estabelecimentos',
], function ($, Backbone,Estabelecimentos) {
    var EstabelecimentoRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },
        setFilter: function(param) {
            
            Estabelecimentos.trigger("filter", param);
        }

    });

    return EstabelecimentoRouter;
});