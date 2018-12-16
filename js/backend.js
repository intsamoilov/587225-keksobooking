'use strict';
(function () {
  var TIMEOUT = 10000;
  var HTTP_SUCCESS_CODE = 200;
  // ----------------------------------------------------------------------------
  window.backend = {
    loadFromServer: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === HTTP_SUCCESS_CODE) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status);
        }
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status);
      });
      xhr.addEventListener('timeout', function () {
        xhr = TIMEOUT;
        onError(xhr.status);
      });
      xhr.open('GET', window.variables.LOAD_SERVER_URL);
      xhr.send();
    },
    uploadToServer: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === HTTP_SUCCESS_CODE) {
          onLoad();
        } else {
          onError(xhr.status);
        }
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status);
      });
      xhr.addEventListener('timeout', function () {
        xhr = TIMEOUT;
        onError(xhr.status);
      });
      xhr.open('POST', window.variables.UPLOAD_SERVER_URL);
      xhr.send(data);
    }
  };
})();
