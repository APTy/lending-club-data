// analysis.js

var svg = d3.selectAll('svg');

var displayData = function(data) {
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('svg:circle')
    .attr('r', function(d) { return d.interest*2; })
    .attr('cx', function(d) { return d.amount/50; })
    .attr('cy', function(d) { return d.interest*30 - 120; })
    .attr('stroke', 'rgba(255,255,255,0.5)')
    .attr('stroke-width', '1px')
    .style('fill', function(d) {
      var scale = Math.floor(Math.min(d.interest*10,255));
      return ["rgba(", scale,",", 255 - scale,",", 0, ',' , 0.8, ")"].join("");
    })
    .append('svg:title')
    .text(function(d) {
      return 'Amount: ' + d.amount + '\nInterest: ' + d.interest;
    });
};

var getData = function() {
  api.get(function(data) {
    displayData(data);
  });
};
