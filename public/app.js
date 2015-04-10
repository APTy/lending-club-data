// app.js

var AppView = Backbone.View.extend({

  views: {
    visualizer: this.vizView,
    about: this.aboutView
  },

  events: {
    'click .nav-tabs li': 'changeTab'
  },

  changeTab: function(e) {
    var hash = e.toElement.hash.replace('#', '');
    this.childView = this.views[hash];
    this.render();
  },

  initialize: function() {
    this.views.visualizer = new VizView({ model: new VizModel() });
    this.views.about = new AboutView();
    this.childView = this.views.visualizer;
    this.render();
  },

  render: function() {
    return this.$('#app-view').html( this.childView.el );
  }

});

$(function() {
  var app = new AppView({ el: $('#app') })
});
