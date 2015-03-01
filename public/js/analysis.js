// analysis.js

var svg = d3.selectAll('svg');
var loanData;
var normData = [];
var types = ['amount', 'interest', 'income', 'credit util'];
var scales = {};
var maxScale = {
  'x-axis': 800,
  'y-axis': 600,
  size: 50,
  color: 255
};

var setScales = function(number) {
  var min = {};
  var max = {};
  var prop;

  // Find minimum and max values
  loanData.forEach(function(loan) {
    for (var k in scales) {
      prop = scales[k];

      if(!min[k]) { min[k] = loan[scales[k]]; }
      if(!max[k]) { max[k] = loan[scales[k]]; }

      min[k] = Math.min(min[k], loan[prop]);
      max[k] = Math.max(max[k], loan[prop]);
    }
  });


  // Populate normalized data array
  loanData.forEach(function(loan) {
    var newLoan = {}
    var temp;

    for (var k in scales) {
      prop = scales[k];

      temp = loan[prop];
      temp -= min[k];
      temp *= maxScale[k];
      temp /= (max[k] - min[k]);
      Math.floor(temp);

      newLoan[k] = temp;
    }

    normData.push(newLoan);
  });

  displayData(normData);
};

var displayData = function(data) {
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('svg:circle')

    .attr('r', function(d, i) { return d['size'];})
    .attr('cx', function(d) { return d['x-axis']; })
    .attr('cy', function(d) { return d['y-axis']; })
    .attr('stroke', 'rgba(255,255,255,0.5)')
    .attr('stroke-width', '1px')

    .style('fill', function(d) {
      var scale = Math.floor(d['color']);
      return ["rgba(", 0,",", 255 - scale,",", scale, ',' , 0.8, ")"].join("");
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

  setScales();
};

var getData = function() {
  api.get(function(data) {
    loanData = data;
    getOptions();
  });
};

showTypes();
