'use strict';
(function () {
  var TIMEOUT = 10000;
  var HTTP_SUCCESS_CODE = 200;

  window.backend = {
    load: function (onLoad, onError, type, url, data) {
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
        onError(xhr.status);
      });
      xhr.timeout = TIMEOUT;
      xhr.open(type, url);
      xhr.send(data);
    }
  };
})();
