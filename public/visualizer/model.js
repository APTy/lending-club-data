// visualizer/model.js

'use strict';

var VizModel = Backbone.Model.extend({

  getData: function() {
    var scales = {
      'x-axis': this.get('x-axis'),
      'y-axis': this.get('y-axis'),
      'size': this.get('size'),
      'color': this.get('color'),
    };

    api.post(scales, function(data) {
      this.set({
        loanData: data,
        scaleData: scale.set(data, scales)
      });
    }.bind(this));
  },

  // Get initial loan data types
  initialize: function() {
    api.getInitialData(function(data) {
      this.set({types: data});
    }.bind(this));
  }

});
