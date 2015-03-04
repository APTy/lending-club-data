// api.js

var api = (function() {

  var URL = 'http://localhost:3000/api/v1';

  var getx = function(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL, "false");
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response);
      }
    };
  };

  var getInitialData = function(callback) {
    $.ajax({
      type: 'GET',
      url: URL + '/types',
      contentType: 'application/json',
      success: callback
    });
  };

  var post = function(dataTypes, callback) {
    $.ajax({
      type: 'POST',
      url: URL,
      contentType: 'application/json',
      data: JSON.stringify(dataTypes),
      success: callback
    });
  };

  return {
    getInitialData: getInitialData,
    post: post
  };
})();
