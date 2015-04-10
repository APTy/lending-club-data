// app.js

var AppView = Backbone.View.extend({

  views: {
    viz: new VizView({ el: this.el, model: new VizModel() }),
    about: new AboutView(),
    hist: new HistView()
  },

  events: {
    'click .nav-tabs li': 'changeTab'
  },

  changeTab: function(e) {
    var hash = e.toElement.hash.replace('#', '');
    this.childView = this.views[hash];
    this.childView.delegateEvents();
    this.render();
  },

  initialize: function() {
    this.childView = this.views.viz;
    this.render();
  },

  render: function() {
    return this.$('#app-view').html( this.childView.el );
  }

});

$(function() {
  var app = new AppView({ el: $('#app') })
});
