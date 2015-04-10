// hist/view.js

'use strict';

var HistView = Backbone.View.extend({

  template: 'hist/hist.html',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.load(this.template).html();
    return this.$el;
  }

});
