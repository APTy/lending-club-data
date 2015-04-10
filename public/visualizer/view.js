// visualizer/view.js

'use strict';

var VizView = Backbone.View.extend({

  template: 'visualizer/viz.html',

  events: {
    'click #get-data': 'getData',
    'change .types': 'changeSelect'
  },

  getData: function() {
    this.model.getData.call(this);
  },

  changeSelect: function(e) {
    this.model.set(e.target.id, e.target.value);
  },

  showTypes: function() {
    var $selects = this.$('.types');

    $selects.each(function(i, select) {
      this.model.get('types').forEach(function(type, i) {
        var $option = $('<option/>', {
          text: type,
          value: type
        });
        $(select).append($option);
      });
      this.model.set(select.id, select.value);
    }.bind(this));
  },

  initialize: function() {
    this.render();

    this.model.on('change', function() {
      // console.log('ayyy');
    });
  },

  addListeners: function() {
    this.showTypes.call(this);
    // this.model.once('change:types', this.showTypes.bind(this));
  },

  render: function() {
    this.$el.load(this.template, this.addListeners.bind(this)).html();
    this.delegateEvents();
    return this.$el;
  }

});
