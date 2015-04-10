// visualizer/model.js

'use strict';

var VizModel = Backbone.Model.extend({

  defaults: {
    types: [],
  },

  getData: function() {
    getData.call(this);
  },

  // Get initial loan data types
  initialize: function() {
    api.getInitialData(function(data) {
      this.set({types: data});
    }.bind(this));
  }

});
