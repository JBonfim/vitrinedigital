// Filename: views/projects/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above,
  'models/promocao',
  'collections/promocoes',
  'text!templates/anuncioListTemplate.html'

], function($, _, Backbone, Promocao, PromocoesCollection, anuncioListTemplate){


  FileInput = Backbone.View.extend({
    initialize: function(options) {
      console.log("1");
      _.bindAll(this, 'fail', 'uploading', 'done');
      options = options || {};
      this.url = options.url || '/upload';

      this.data = options.data || {};
      this._name = options.name || 'files[]';
      this._multiple = options.multiple || true;
      this._enabled = options.enabled || true;
      return this;
    },
    tagName: 'input',
    events: {
      'change': 'change'
    },
    render: function() {
      console.log("1.1");
      this.$el.attr('type', 'file').attr('name', this._name);
      if (this._multiple) {
        this.$el.attr('multiple', true);
      }
      if (!this._enabled) {
        this.$el.attr('disabled', 'disabled');
      }
      this.$input = this.$el;
      return this;
    },
    enable: function(enable) {
      console.log("1.2");
      if (this._enabled != enable) {
        this._enabled = enable;
        if (enable) {
          this.$input.removeAttr('disabled');
        } else {
          this.$input.attr('disabled', 'disabled');
        }
        this.trigger('enabled', enable);
      }
    },
    toggle_enable: function() {
      console.log("1.3");
      this.enable(!this._enabled);
    },
    change: function(ev) {
      console.log("1.4");
      if (this._enabled) {

        $.ajax(this.url, {
          files: this.$input,
          iframe: true,
          dataType: 'json',
          data: this.data
        }).always(this.uploading)
          .done(this.done)
          .fail(this.fail);
      }
    },
    done: function(data, textStatus, jqXHR) {
      console.log("1.5");
      this.collection.add(data);
      this.trigger('done', this.collection, data, textStatus, jqXHR);
    },
    fail: function(jqXHR) {
      console.log("1.6");
      this.trigger('fail', JSON.parse(jqXHR.responseText), jqXHR);
    },
    uploading: function(data, textStatus, jqXHR) {
      console.log("1.7");
      this.trigger('uploading');
      this.$input.val('');
    }
  }),

  LabelFileInput = Backbone.View.extend({
    template: '<%=text%><input type=file name=<%=name%> <%= enabled ? "" : "disabled=disabled" %> <%= multiple ? "multiple" : ""%> />',
    initialize: function(options) {
            console.log("2");

      options = options || {};
      //this._text = options.text || 'Upload File';
      this.template = options.template || _.template(this.template);
      return FileInput.prototype.initialize.call(this, options);
    },
    tagName: 'label',
    className: 'file-upload',
    events: {
      'change input[type=file]': 'change'
    },
    render: function() {
      console.log("2.1");

      this.$el.html(this.template(this.serialize()));
      this.$input = this.$('input[type=file]');
      if (!this._enabled) {
        this.$el.addClass('disabled');
      }
      return this;
    },
    serialize: function() {
      console.log("2.2");
      return {text: 'Upload File',
        name: this._name,
        multiple: this._multiple,
        enabled: this._enabled};
    },
    
    enable: function(enable) {
      console.log("2.3");
      if (this._enabled != enable) {
        this.$el[enable ? 'removeClass' : 'addClass']('disabled');
        return file_upload.Views.FileInput.prototype.enable.call(this, enable);
      }
    }
  });
  return LabelFileInput;

});
