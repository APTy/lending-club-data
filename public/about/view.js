// about/view.js

'use strict';

var AboutView = Backbone.View.extend({

  template: 'about/about.html',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.load(this.template).html();
    return this.$el;
  }

});
