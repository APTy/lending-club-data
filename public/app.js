// app.js

var AppView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.load('visualizer/view.html').html();
  }
});

var app = new AppView({ el: $('#app-view') })
