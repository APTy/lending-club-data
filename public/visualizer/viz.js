// visualizer/viz.js

'use strict';

var VizView = Backbone.View.extend({

  template: 'visualizer/viz.html',

  events: {
    'click #get-data': 'getData'
  },

  getData: function() {
    console.log(this);
    this.model.getData();
  },

  showTypes: function() {
    this.model.attributes.types.forEach(function(type, index) {
      var $selects = this.$('.types');

      $selects.each(function(i, select) {
        var $option = $('<option/>', {
          text: type,
          value: type
        });
        $(select).append($option);
      });
    }.bind(this));
  },

  initialize: function() {
    this.render();
  },

  addListeners: function() {
    this.showTypes.call(this);
    // this.model.once('change:types', this.showTypes.bind(this));
  },

  render: function() {
    this.$el.load(this.template, this.addListeners.bind(this)).html();
    return this.$el;
  }

});

var VizModel = Backbone.Model.extend({

  defaults: {
    types: []
  },

  getData: function() {
    getData.call(this);
  },

  initialize: function() {
    api.getInitialData(function(data) {
      this.set({types: data});
    }.bind(this));
  }

});
