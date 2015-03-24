// Filename: views/projects/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above,
  'models/promocao',
  'collections/promocoes',
  'views/FileUpload',
  'text!templates/anuncioListTemplate.html'

], function($, _, Backbone, Promocao, PromocoesCollection,LabelFileInput, anuncioListTemplate){


      Upload = Backbone.View.extend({
      initialize: function() {
        //this.collection.fetch();
        return this;
      },
      events: {
        'click .toggle-readonly': 'toggle_readonly'
      },
      render: function() {
              console.log("3");

        this.upload_view = new LabelFileInput({
          collection: this.collection,
          text: '&#8853; Upload!'
        });
        this.upload_view.on('uploading', this.uploading, this);
        this.upload_view.on('done', this.done, this);
        this.upload_view.on('fail', this.fail, this);
        this.upload_view.on('enabled', this.enable, this);
        this.upload_view.render();
        this.upload_view.$el.insertAfter(this.$('.toggle-readonly'));

        this.files_view = new FileView({
          collection: this.collection
        }).render();
       
        return this;
      },
      uploading: function() {
        this.$('.file-upload').addClass('disabled');
        this.$('.log').append('<li>Uploading...</li>');
        console.log("Uploading....");
      },
      enable: function(enabled) {
        this.$('.file-upload')[enabled ? 'removeClass' : 'addClass']('disabled');
      },
      fail: function(data) {
        console.error(data);
        this.$('.log').append('<li>Error</li>');
      },
      done: function() {
        this.$('.log').append('<li>Success</li>');
        this.$('.file-upload').removeClass('disabled');
      },
      toggle_readonly: function(ev) {
        ev.preventDefault();
        this.upload_view.toggle_enable();
        this.files_view.toggle_readonly();
        this.$('.toggle-readonly').text('readonly: ' + this.files_view._readonly);
      }
    }),
    FileView = Backbone.View.extend({
      initialize:function(){
        
        this.collection.on('reset', this.render, this);
        this.collection.on('add', this.exibir, this);
        return this;

      },
      render:function(){
       

        this.collection.each(this.exibir);

        return this;
      },
      exibir:function(file){
       
        console.log("exibir url: "+file.get('url'));
        //var file = new Imagem();
        //Imagem.create({idProduto: this.$idProduto.val(), url: file.get('url')})

      }

    });

    return Upload;



});
