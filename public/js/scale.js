// scaling.js

var scale = (function() {

  var setScales = function(loans, scales) {
    var normData = [];
    var min = {};
    var max = {};
    var prop;
    var ranges = {
      'Loan Amount': [0, 35000],
      'Interest Rate': [5, 25],
      'Annual Income': [0, 200000],
      'Debt-To-Income': [0, 30]
    };
    var maxScale = {
      'x-axis': 750,
      'y-axis': 550,
      size: 50,
      color: 100
    };
    // Find minimum and max values
    loans.forEach(function(loan) {
      for (var k in scales) {
        prop = scales[k];

        if (ranges[prop] === undefined) {
          if(!min[k]) { min[k] = loan[scales[k]]; }
          if(!max[k]) { max[k] = loan[scales[k]]; }

          min[k] = Math.min(min[k], loan[prop]);
          max[k] = Math.max(max[k], loan[prop]);
        } else {
          min[k] = ranges[prop][0];
          max[k] = ranges[prop][1];
        }
      }
    });

    // Populate normalized data array
    loans.forEach(function(loan) {
      var newLoan = {}
      var temp;

      for (var k in scales) {
        prop = scales[k];

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
