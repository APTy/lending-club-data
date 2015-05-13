
exports.startTimer = function() {
  var start = new Date();
  var end = new Date();

  return function() {
    end = new Date();
    console.log((end - start) + "ms has elapsed.\n");
    start = end;
  };
}
