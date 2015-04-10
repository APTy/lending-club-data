// js/analysis.js

var displayData = function(svg, scaleData, loanData) {
  svg.selectAll('circle').remove();

  svg.selectAll('circle')

    // Set the circles on the page with new data and
    // add new circles to the page as necessary
    .data(scaleData)
    .enter()
    .append('svg:circle')

    // Set the basic attributes of the circles, including
    // the circle size, x-position, and y-position
    .attr('r', function(d, i) { return d['size'];})
    .attr('cx', function(d) { return d['x-axis']; })
    .attr('cy', function(d) { return d['y-axis']; })
    .attr('stroke', 'rgba(200,255,255,1)')
    .attr('stroke-width', '2px')

    // Use a custom color scale to set the color of the circles
    .style('fill', function(d) {
      var scale = Math.floor(d['color']);

      return ["rgba(", 69 + Math.floor(scale*20/100),
              ",", 173 - Math.floor(scale*94/100),
              ",", 168 - Math.floor(scale*89/100),
              ',' , 0.8, ")"].join("");
    });

    // Add tooltips to the circles
    // .append('svg:title')
    // .text(function(d, i) {
    //   return scales['size'] + ': ' + loanData[i][scales['size']] + '\n' +
    //   scales['x-axis'] + ': ' + loanData[i][scales['x-axis']] + '\n' +
    //   scales['y-axis'] + ': ' + loanData[i][scales['y-axis']] + '\n' +
    //   scales['color'] + ': ' + loanData[i][scales['color']];
    // });
};

// Request specific loan data from server
var getData = function(scales) {
  api.post(scales, function(data) {
    this.set({
      loanData: data,
      scaleData: scale.set(data, scales)
    });
  }.bind(this));
};
