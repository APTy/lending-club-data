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
    .attr('r', function(d, i) { return d['size']; })
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

var initChart = function() {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .domain([-width / 2, width / 2])
      .range([0, width]);

  var y = d3.scale.linear()
      .domain([-height / 2, height / 2])
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
      .tickSize(-width);

  var zoom = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([1, 32])
      .on("zoom", zoomed);

  var svg = d3.selectAll(this.$('svg'))
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  svg.append("g")
      .attr("class", "display");

  function zoomed() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);
    svg.select(".display")
    .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    svg.selectAll('.display circle')
    .attr('stroke-width', (2/d3.event.scale) + 'px')
    .attr('display', function(d) {
      var display = d['x-axis'] + d3.event.translate[0] / d3.event.scale < d['size'] + 5 ||
                    d['y-axis'] + d3.event.translate[1] / d3.event.scale < d['size'] + 5 ||
                    d['x-axis'] + d3.event.translate[0] / d3.event.scale > width / d3.event.scale - d['size'] - 10  ||
                    d['y-axis'] + d3.event.translate[1] / d3.event.scale > height / d3.event.scale - d['size'] - 10;
      return display ? 'none' : true;
    });
  }
}
