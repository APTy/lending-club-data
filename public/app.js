// app.js

var AppView = Backbone.View.extend({
  initialize: function() {
    this.childView = new VizView({ model: new VizModel() });
    this.render();
  },
  render: function() {
    return this.$el.append( this.childView.el );
  }
});

$(function() {
  var app = new AppView({ el: $('#app-view') })
});
