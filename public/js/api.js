// api.js

var api = (function() {

  var get = function(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/v1", "false");
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response);
      }
    };
  };

  var post = function(dataTypes, callback) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/v1',
      contentType: 'application/json',
      data: JSON.stringify(dataTypes),
      success: callback
    });
  };

  return {
    get: get,
    post: post
  };
})();
