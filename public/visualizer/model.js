// visualizer/model.js

'use strict';

var VizModel = Backbone.Model.extend({

  defaults: {
    types: [],
  },

  getData: function() {
    var scales = {
      'x-axis': this.get('x-axis'),
      'y-axis': this.get('y-axis'),
      'size': this.get('size'),
      'color': this.get('color'),
    };
    getData.call(this, scales);
  },

  // Get initial loan data types
  initialize: function() {
    api.getInitialData(function(data) {
      this.set({types: data});
    }.bind(this));
  }

});
