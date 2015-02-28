// analysis.js

var getData = function() {
  var xhr = new XMLHttpRequest();

  console.log('Getting data...');

  xhr.open("GET", "http://localhost:3000/api/v1", "false");
  xhr.send();
  xhr.onreadystatechange = function() {
    console.log(xhr.responseText);
  };
};
