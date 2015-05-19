// visualizer/model.js

'use strict';

var VizModel = Backbone.Model.extend({

  url: 'http://localhost:3000/api/v1',

  getData: function() {
    var scales = {
      'x-axis': this.get('x-axis'),
      'y-axis': this.get('y-axis'),
      'size': this.get('size'),
      'color': this.get('color'),
    };

    this.save(null, {
      success: function(model, data) {
        this.set({
          loanData: data,
          scaleData: scale.set(data, scales)
        });
      }.bind(this)
    });
  },

  // Get initial loan data types
  initialize: function() {
    this.fetch({
      url: this.url + '/types',
      success: function(model, data) {
        this.set({types: data});
      }.bind(this)
    });
  }

});
