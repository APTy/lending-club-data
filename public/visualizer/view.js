// visualizer/view.js

'use strict';

var VizView = Backbone.View.extend({

  template: 'visualizer/viz.html',

  events: {
    'click #get-data': 'getData',
    'change .types': 'changeSelect'
  },

  ////////////////////          VIEW CREATION          ////////////////////
  initialize: function() {
    this.render();

    this.model.on('change:loanData', function() {
      this.showData();
    }.bind(this));
  },

  addListeners: function() {
    this.showTypes.call(this);
  },

  render: function() {
    this.$el.load(this.template, this.addListeners.bind(this)).html();
    return this.$el;
  },

  ////////////////////          MODEL INTERACTION          ////////////////////
  getData: function() {
    this.model.getData();
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

  showData: function() {
    var svg = d3.selectAll(this.$('svg'));
    displayData(svg, this.model.get('scaleData'), this.model.get('loanData'));
  }

});
