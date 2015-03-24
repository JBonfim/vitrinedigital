// require configuration
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
	   }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
        text: '../bower_components/requirejs-text/text'
    }
});

require([
    'backbone',
    'views/app',
    'views/app_estabel',
    'views/app_produto',
    'views/app_promocao',
    'views/anuncioviwer',
    'routers/router'
], function (Backbone, AppView,AppEstabView,AppProdutoView,AppPromocaoView,AnunciosView, Router) {
    // start routerAnunciosView
    new Router();
    //new Router();
    Backbone.history.start();

    // start the application
    new AnunciosView();
    new AppView();
    new AppEstabView();
    new AppProdutoView();
    new AppPromocaoView();
    
});
