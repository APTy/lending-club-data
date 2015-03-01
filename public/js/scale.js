// scaling.js

var scale = (function () {

  var setScales = function(loans) {
    var normData = [];
    var min = {};
    var max = {};
    var prop;

    // Find minimum and max values
    loans.forEach(function(loan) {
      for (var k in scales) {
        prop = scales[k];

        if(!min[k]) { min[k] = loan[scales[k]]; }
        if(!max[k]) { max[k] = loan[scales[k]]; }

        min[k] = Math.min(min[k], loan[prop]);
        max[k] = Math.max(max[k], loan[prop]);
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
        Math.floor(temp);

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
