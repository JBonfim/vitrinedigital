define([
    "underscore",
    "backbone",
    'backboneLocalstorage',
    "models/Imagem"
], function(_, Backbone, Store, Imagem) {
    var ImagemsCollection = Backbone.Collection.extend({
        model: Imagem,
        url: "/files", // url of the REST API
        initialize: function(options) {
	      options = options || {}
	      this.url = options.url || '/files';
	      console.log("initialize...."+this.url);
	      return this;
	    }
    });

    return new ImagemsCollection();
});