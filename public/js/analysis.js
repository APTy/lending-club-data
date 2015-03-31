// analysis.js

var svg;
var loanData;
var types = ['amount', 'interest', 'income', 'credit util'];
var scales = {};

var displayData = function(data) {
  svg.selectAll('circle').remove();

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('svg:circle')

    .attr('r', function(d, i) { return d['size'];})
    .attr('cx', function(d) { return d['x-axis']; })
    .attr('cy', function(d) { return d['y-axis']; })
    .attr('stroke', 'rgba(200,255,255,1)')
    .attr('stroke-width', '2px')

    .style('fill', function(d) {
      var scale = Math.floor(d['color']);

      return ["rgba(", 69 + Math.floor(scale*20/100),
              ",", 173 - Math.floor(scale*94/100),
              ",", 168 - Math.floor(scale*89/100),
              ',' , 0.8, ")"].join("");
    })

    .append('svg:title')
    .text(function(d, i) {
      return scales['size'] + ': ' + loanData[i][scales['size']] + '\n' +
      scales['x-axis'] + ': ' + loanData[i][scales['x-axis']] + '\n' +
      scales['y-axis'] + ': ' + loanData[i][scales['y-axis']] + '\n' +
      scales['color'] + ': ' + loanData[i][scales['color']];
    });
};

var showTypes = function() {
  types.forEach(function(type, index) {
    var select = document.getElementsByClassName('types')

    for (var i = 0; i < select.length; i++) {
      var option = document.createElement('option');
      option.text = option.value = type;
      i === index && (option.selected = 'selected');
      select[i].appendChild(option);
    }
  });
};

var getOptions = function() {
  var select = document.getElementsByClassName('types');

  for (var i = 0; i < select.length; i++) {
    scales[select[i].id] = select[i].value;
  }
};

// Request specific loan data from server
var getData = function() {
  getOptions();

  api.post(scales, function(data) {
    loanData = data;
    displayData(scale.set(loanData));
  });
};


// Get initial loan data types
$(function() {
  svg = d3.selectAll('svg');

  api.getInitialData(function(data) {
    types = data;
    showTypes();
  });
})
