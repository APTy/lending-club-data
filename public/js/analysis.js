// analysis.js

var svg = d3.selectAll('svg');
var loanData;
var types = ['amount', 'interest', 'income', 'credit util'];
var scales = {};

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

  // types.forEach(function(type, index) {
  //   $('.dropdown-menu').each(function(i, dropdown) {
  //     var option = document.createElement('option');
  //     var $option = $('<li/>', {
  //       role: 'presentation'
  //       });
  //     var $a = $('<a/>', {
  //       role: 'menuitem',
  //       href: '#',
  //       text: type
  //     }).appendTo($option);
  //     // option.text = option.value = type;
  //     // i === index && (option.selected = 'selected');
  //     //<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
  //     $(dropdown).append($option);
  //   });
  // });
};

var getOptions = function() {
  var select = document.getElementsByClassName('types');

  for (var i = 0; i < select.length; i++) {
    scales[select[i].id] = select[i].value;
  }
};

var getData = function() {
  api.get(function(data) {
    loanData = data;
    getOptions();
    displayData(scale.set(loanData));
  });
};

showTypes();
