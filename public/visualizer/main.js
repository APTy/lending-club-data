// visualizer/main.js

var VizView = Backbone.View.extend({

  template: 'visualizer/main.html',

  events: {
    'click #get-data': 'getData'
  },

  getData: function() {
    this.model.getData();
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.load(this.template).html();
  }

});

var VizModel = Backbone.Model.extend({

  getData: function() {
    getData();
  }

});
