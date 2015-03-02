// scaling.js

var scale = (function () {

  var setScales = function(loans) {
    var normData = [];
    var min = {};
    var max = {};
    var prop;
    var ranges = {
      'amount': [0, 35000],
      'interest': [5, 25],
      'income': [0, 200000],
      'credit util': [0, 100]
    };
    var maxScale = {
      'x-axis': 750,
      'y-axis': 550,
      size: 50,
      color: 255
    };

    // Find minimum and max values
    // loans.forEach(function(loan) {
      for (var k in window.scales) {
        prop = window.scales[k];

        // if(!min[k]) { min[k] = loan[window.scales[k]]; }
        // if(!max[k]) { max[k] = loan[window.scales[k]]; }

        // min[k] = Math.min(min[k], loan[prop]);
        // max[k] = Math.max(max[k], loan[prop]);

        min[k] = ranges[prop][0];
        max[k] = ranges[prop][1];
      }
    // });

    // Populate normalized data array
    loans.forEach(function(loan) {
      var newLoan = {}
      var temp;

      for (var k in window.scales) {
        prop = window.scales[k];

        temp = loan[prop];
        temp -= min[k];
        temp *= maxScale[k];
        temp /= (max[k] - min[k]);
        temp = Math.floor(Math.min(temp, maxScale[k]));

        newLoan[k] = temp;
      }
      normData.push(newLoan);
    });
    
    return normData;
  };

  return {
    set: setScales
  };
})();
